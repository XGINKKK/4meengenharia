// Declaração de tipo para o dataLayer do GTM
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { useState } from 'react';

const phoneRegex = /^\(?([0-9]{2})\)?[-. ]?([0-9]{4,5})[-. ]?([0-9]{4})$/;

const contactFormSchema = z.object({
  name: z.string().min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }).max(100),
  email: z.string().email({ message: 'E-mail inválido' }).max(255),
  phone: z.string().regex(phoneRegex, { message: 'Telefone inválido. Use o formato (00) 00000-0000' }),
  projectType: z.string().min(1, { message: 'Selecione um tipo de projeto' }),
  otherProjectType: z.string().optional(),
  message: z.string().min(20, { message: 'A mensagem deve ter no mínimo 20 caracteres' }).max(1000),
}).refine((data) => {
  if (data.projectType === 'outros' && !data.otherProjectType) {
    return false;
  }
  return true;
}, {
  message: 'Por favor, especifique o tipo de projeto',
  path: ['otherProjectType'],
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      projectType: '',
      otherProjectType: '',
      message: '',
    },
  });

  const selectedProjectType = form.watch('projectType');

  const formatPhoneNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 2) return numbers;
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);

    try {
      // Prepara os dados para envio ao webhook
      const webhookData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        projectType: data.projectType === 'outros' && data.otherProjectType
          ? data.otherProjectType
          : data.projectType,
        message: data.message,
        timestamp: new Date().toISOString(),
        source: 'Landing Page 4ME Engenharia'
      };

      console.log('Enviando dados para webhook:', webhookData);

      // Envia para o webhook usando variável de ambiente
      const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL;

      if (!webhookUrl) {
        throw new Error('VITE_N8N_WEBHOOK_URL não configurada');
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData),
      });

      if (!response.ok) {
        throw new Error(`Erro no webhook: ${response.status}`);
      }

      console.log('Resposta do webhook:', await response.json().catch(() => 'Sem resposta JSON'));

      // Dispara evento para o Google Tag Manager
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        'event': 'form_lead_success'
      });

      toast({
        title: 'Mensagem enviada com sucesso!',
        description: 'Entraremos em contato em breve.',
        className: 'bg-green-600 text-white border-green-700',
      });

      form.reset();
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      toast({
        title: 'Erro ao enviar mensagem',
        description: 'Por favor, tente novamente mais tarde.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="engineering-card p-8 w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-semibold">Nome completo *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite seu nome completo"
                    className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-semibold">E-mail *</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="seu@email.com"
                    className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-semibold">Telefone/WhatsApp *</FormLabel>
                <FormControl>
                  <Input
                    placeholder="(00) 00000-0000"
                    className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500/20"
                    {...field}
                    onChange={(e) => {
                      const formatted = formatPhoneNumber(e.target.value);
                      field.onChange(formatted);
                    }}
                    maxLength={15}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="projectType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-semibold">Tipo de projeto *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-[#1a1a1a] border-gray-700 text-white focus:border-green-500 focus:ring-green-500/20">
                      <SelectValue placeholder="Selecione o tipo de projeto" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#1a1a1a] border-gray-700">
                    <SelectItem value="residencial" className="text-white hover:bg-gray-800 focus:bg-gray-800">
                      Residencial
                    </SelectItem>
                    <SelectItem value="comercial" className="text-white hover:bg-gray-800 focus:bg-gray-800">
                      Comercial
                    </SelectItem>
                    <SelectItem value="industrial" className="text-white hover:bg-gray-800 focus:bg-gray-800">
                      Industrial
                    </SelectItem>
                    <SelectItem value="reformas" className="text-white hover:bg-gray-800 focus:bg-gray-800">
                      Reformas
                    </SelectItem>
                    <SelectItem value="outros" className="text-white hover:bg-gray-800 focus:bg-gray-800">
                      Outros
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          {selectedProjectType === 'outros' && (
            <FormField
              control={form.control}
              name="otherProjectType"
              render={({ field }) => (
                <FormItem className="animate-in fade-in-50 duration-300">
                  <FormLabel className="text-white font-semibold">Especifique o tipo de projeto *</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Descreva o tipo de projeto"
                      className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500/20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-semibold">Mensagem/Descrição do projeto *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descreva seu projeto com o máximo de detalhes possível..."
                    className="bg-[#1a1a1a] border-gray-700 text-white placeholder:text-gray-500 focus:border-green-500 focus:ring-green-500/20 min-h-[120px] resize-y"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold text-lg py-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ContactForm;
