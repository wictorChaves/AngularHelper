**Usuários**

- [x] Administrador ( Terá acesso a todo o sistema )
- [x] Médico CRUD ( Terá acesso a todo o sistema, com exceção a marcação, onde poderá apenas visualizar )
- [x] Recepção CRUD ( Terá acesso apenas a marcação )
- [x] Paciente CRUD ( Terá acesso apenas a Histórico clínico )

**Receituários ( CRUD de medicamentos ) ( Exclusão lógica ) ( Acesso: Médico )**

- [x] Medicamento
     - [x] Nome genérico 
     - [x] Nome de fábrica  
     - [x] Fabricante 
 
**Receitas ( Acesso: Médico )**

 - [x] Prescrever medicamentos
 
**Exames ( Acesso: Médico )**

- [x] Tipos de exames (cadastrado diretamente no BD)
- [x] Solicitação
- [x] Recebimento
- [x] Resultados
     
**Marcação de consultas dos pacientes  ( Acesso: Recepção )**

- [x] Agenda do médico
- [x] Marcar ( verificar agenda do médico )
- [x] Pesquisar
- [x] Cancelar
- [x] Histórico
- [x] Estatísticas de Atendimentos ( Contagem dos Status )
 
**Histórico clínico do paciente ( Tela para mostrar informações das outras telas ) ( Acesso: Paciente )**

-  [x] Receitas ( Imprimir )
-  [x] Exames solicitados 
-  [x] Resultados obtidos dos exames ( Imprimir )
