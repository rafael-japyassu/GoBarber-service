# Recuperação de senha

**RF (Requisistos Funcionais)**

- O usuário deve poder recuperar sua senha informando seu e-mail;
- O usário deve receber um e-mail com instruções de recuperação de senha;
- O usário deve poder resetar sua senha;

**RNF (Requisistos Não Funcionais)**

- Utilizar o Mailtrap para testar envio de emails em ambiente de dev;
- Utilizar o Amazon SES para envios em produção;  
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN (Regras de Negócio)**

- O link enviado por e-mail para resetar senha, deve expirar em 2h;
- O usuário precisa cinfirmar a nova senha ao resetar a sua senha;

# Atualização de Perfil

**RF (Requisistos Funcionais)**

- O usuário deve poder atualizar seu nome, email, senha;

**RN (Regras de Negócio)**

- O usuário não pode alterar seu e-mail para um e-mail já utilizado.
- Para atualizar sua senha o usuário deve informar a senha antiga;
- Para atualizar sua senhha o usuário precisa confirmar sua senha;

# Painel do prestador

**RF (Requisistos Funcionais)**

- O usuário deve poder listar seus agendamentos de um dia expecífico;
- O prestador deve receber uma notificação sempre que hover um novo agendamento
- O prestador deve poder visializar as notificações não lidas;

**RNF (Requisistos Não Funcionais)**

- Os agendmentos do prestador no dia devem ser armazenados em cache;
- As notificações devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN (Regras de Negócio)**

- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de Serviços

**RF (Requisistos Funcionais)**

- O usuário deve poder listar todos os prestadores de serviços cadastrados;
- O usário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usário deve poder realizar um novo agendamento com um prestador;

**RNF (Requisistos Não Funcionais)**

- A listagem de prestadores deve ser armazenada em cache;

**RN (Regras de Negócio)**

- Cada agendamento deve durar 1 hora exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro das 8h, último às 17h);
- O usuário não pode agendar ewm um horário já oculpado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;