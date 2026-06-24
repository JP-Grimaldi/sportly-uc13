# Banco de dados — Sportly

Arquivos desta pasta:

- **`database.sql`** — script completo: cria o banco `sportlyDB`, todas as tabelas
  (com PK, AUTO_INCREMENT, tipos, NOT NULL e FK) e insere os dados iniciais de teste.
  Ao final há algumas consultas de exemplo (comentadas) pensando nas rotas da API.
- **`modelo-er.png`** — imagem do modelo entidade-relacionamento (serve como o print do ER).
- **`modelo-er.mwb`** — modelo editável do MySQL Workbench (gerar pelo Workbench, veja abaixo).

## Como rodar o script

O script já faz `DROP DATABASE IF EXISTS` antes de criar, então pode rodar quantas vezes
quiser. Usuários de teste: e-mails `grimaldi@sportly.com`, `thales@sportly.com`,
`cris@sportly.com` — senha de todos: **123456**.

## Como geramos o `modelo-er.mwb` no Workbench

1. Abra o MySQL Workbench.
2. `Database (ou alguma coisa assim) > Reverse Engineer SQL Script...`
3. Selecione o arquivo `database.sql` desta pasta e siga o assistente (Next,
   Next, Execute, Next, Finish). O Workbench lê o script e desenha o
   diagrama automaticamente, com todas as tabelas e relacionamentos.
4. Salve o modelo com `File > Save Model As...` dentro desta pasta, como
   `modelo-er.mwb`.

