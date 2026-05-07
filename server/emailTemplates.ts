/**
 * Email templates for the 782 Business Address sales and registration flow
 */

export const emailTemplates = {
  // Email sent to customer after purchase
  customerConfirmation: (customerName: string, planName: string, questionnairLink: string, roomNumber?: number) => {
    const roomDisplay = roomNumber ? `Sl ${String(roomNumber).padStart(2, "0")}` : "";
    const addressLine = roomDisplay ? `Rua Conde de Linhares, 782 - ${roomDisplay}` : "Rua Conde de Linhares, 782";
    return {
      subject: `Confirmação de Compra - Hub Evolua Business Address`,
      html: `
        <h2>Olá ${customerName}!</h2>
        
        <p>Sua compra foi confirmada com sucesso! 🎉</p>
        
        <h3>Plano Contratado: ${planName}</h3>
        
        ${roomDisplay ? `<h3>Seu Endereço Fiscal</h3>
        <p><strong>${addressLine}</strong><br>Belo Horizonte – MG, CEP: 30000-000</p>` : ""}
        
        <h3>Manual de Operações</h3>
        <ul>
          <li><strong>Como cadastrar seu endereço:</strong> Acesse seu painel e complete o formulário de cadastro</li>
          <li><strong>Como receber correspondência:</strong> Sua caixa de correios estará disponível no endereço da Rua Conde de Linhares, 782</li>
          <li><strong>Próximos passos:</strong> Preencha o questionário abaixo para iniciarmos o registro junto ao contador</li>
        </ul>
        
        <h3>Questionário de Cadastro</h3>
        <p>Para prosseguir com o registro da sua empresa, clique no link abaixo:</p>
        <p><a href="${questionnairLink}" style="background-color: #2D4A7A; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Preencher Questionário</a></p>
        
        <p>Qualquer dúvida, entre em contato conosco!</p>
        
        <p>Atenciosamente,<br>Hub Evolua</p>
      `,
    };
  },

  // Email sent to seller (you) after customer purchase
  sellerConfirmation: (customerName: string, customerEmail: string, customerPhone: string, planName: string, roomNumber?: number) => {
    const roomDisplay = roomNumber ? `Sl ${String(roomNumber).padStart(2, "0")}` : "Pendente";
    return {
      subject: `Nova Venda - ${customerName}`,
      html: `
        <h2>Nova Venda Registrada!</h2>
        
        <h3>Dados do Cliente</h3>
        <ul>
          <li><strong>Nome:</strong> ${customerName}</li>
          <li><strong>Email:</strong> ${customerEmail}</li>
          <li><strong>Telefone:</strong> ${customerPhone}</li>
          <li><strong>Plano:</strong> ${planName}</li>
          <li><strong>Sala Atribuída:</strong> ${roomDisplay}</li>
        </ul>
        
        <p>O cliente receberá um e-mail com instruções de próximos passos.</p>
      `,
    };
  },

  // Email sent to accountant after questionnaire submission
  accountantNotification: (customerName: string, customerEmail: string, companyName: string, questionnairData: Record<string, any>) => ({
    subject: `Novo Cadastro para Registro - ${companyName}`,
    html: `
      <h2>Novo Cadastro para Registro</h2>
      
      <h3>Dados do Cliente</h3>
      <ul>
        <li><strong>Nome:</strong> ${customerName}</li>
        <li><strong>Email:</strong> ${customerEmail}</li>
        <li><strong>Empresa:</strong> ${companyName}</li>
      </ul>
      
      <h3>Informações do Questionário</h3>
      <pre>${JSON.stringify(questionnairData, null, 2)}</pre>
      
      <p>Por favor, proceda com o registro junto aos órgãos competentes.</p>
    `,
  }),

  // Email sent to seller after questionnaire submission
  sellerQuestionnairNotification: (customerName: string, companyName: string, questionnairData: Record<string, any>) => ({
    subject: `Questionário Preenchido - ${companyName}`,
    html: `
      <h2>Questionário Preenchido</h2>
      
      <h3>Cliente: ${customerName}</h3>
      <h3>Empresa: ${companyName}</h3>
      
      <h3>Dados Preenchidos</h3>
      <pre>${JSON.stringify(questionnairData, null, 2)}</pre>
      
      <p>O contador foi notificado e iniciará o processo de registro.</p>
    `,
  }),
};
