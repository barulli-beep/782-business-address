import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Questionnaire() {
  const [formData, setFormData] = useState({
    companyName: '',
    cnpj: '',
    businessType: '',
    address: '',
    phone: '',
    additionalInfo: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitQuestionnaire = trpc.business.submitQuestionnaire.useMutation({
    onSuccess: () => {
      toast.success('Questionário enviado com sucesso! Você receberá um e-mail de confirmação.');
      setFormData({
        companyName: '',
        cnpj: '',
        businessType: '',
        address: '',
        phone: '',
        additionalInfo: '',
      });
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
    },
    onError: (error: any) => {
      toast.error(`Erro ao enviar: ${error?.message || 'Erro desconhecido'}`);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!formData.companyName || !formData.cnpj || !formData.businessType) {
      toast.error('Por favor, preencha todos os campos obrigatórios');
      setIsSubmitting(false);
      return;
    }

    await submitQuestionnaire.mutateAsync(formData);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Cadastro de Empresa</h1>
          <p className="text-slate-600 mb-8">Preencha os dados abaixo para iniciar o registro da sua empresa</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Nome da Empresa *
              </label>
              <Input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Sua Empresa LTDA"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                CNPJ *
              </label>
              <Input
                type="text"
                name="cnpj"
                value={formData.cnpj}
                onChange={handleChange}
                placeholder="00.000.000/0000-00"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tipo de Negócio *
              </label>
              <Input
                type="text"
                name="businessType"
                value={formData.businessType}
                onChange={handleChange}
                placeholder="Ex: Consultoria, Comércio, Serviços"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Endereço Comercial
              </label>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Rua, número, complemento"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Telefone para Contato
              </label>
              <Input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="(31) 99999-9999"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Informações Adicionais
              </label>
              <Textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="Alguma informação importante que o contador deva saber?"
                rows={4}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-[#2D4A7A] to-[#1a2f4d] hover:from-[#1a2f4d] hover:to-[#0f1f35] text-white font-semibold py-3 rounded-lg transition-all duration-200"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Questionário'}
            </Button>
          </form>

          <p className="text-xs text-slate-500 mt-6 text-center">
            Seus dados serão enviados para nosso contador e para você receberá uma confirmação por e-mail.
          </p>
        </Card>
      </div>
    </div>
  );
}
