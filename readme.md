# MÓ FOME

> Uma PWA simples com objetivo de oferecer fácil acesso à uma lista de compras, desenvolvida pensando na usabilidade e pensada para dispositivos móveis. Seus recursos incluem adição, alteração e exclusão de produtos, estes aparecem em uma lista que possui a possibilidade de marcação individual com apenas dois cliques sobre o produto.  
>
> **Projeto desenvolvido por Bruno Dias Del Claro**

# Página principal

Possui uma lista com conteudo proncipal e uma barra superior com dois botões, sendo um oculto se a lista está vazia.

## Lista vazia
![Lista vazia](/readmeImages/Tela1-vazia.jpeg)

### Botão de +:

Ao clicar nesse botão o usuário será redirecionado a tela de adição de produto.

## Com itens na lista

![Lista com itens](/readmeImages/Tela1-lista.jpeg)

Cada item possui as informações relevantes, essas incluem:

* Nome do produto
* Descrição (se fornecida)
* Quantidade de itens (se fornecida)

Ao clicar no botão alterar o usuário é redirecionado a tela de alterar produto.

### Botão de ícone <img src="./assets/shopping-basket.png" alt="Cesta Vazia" width="16" style="background-color:#fff ;border-radius: 16px"/>

Limpa todos os itens da lista.

### Dois cliques em um produto

![Lista com itens selecinados](/readmeImages/Tela1-selecionad.jpeg)

Marca o item com a cor verde para auxiliar nos itens que já foram coletados e saber o que falta.

# Página de adição de produto

![Formulário de adição de produtos](/readmeImages/Tela2-adicao.jpeg)

## Verificação básica de inputs

O único dado obrigatório para adição de produtos é o nome, sendo que existe também uma verificação básica na quantidade de itens.

# Página de alteração de produto

Ao clicar no botão de alterar o usuário é redirecionado para essa página.

![Formulário de altera de produtos](/readmeImages/Tela3-alteracao.jpeg)

Nessa tela é possível alterar os valores do produto ou excluí-lo.

# Dados Armazenadas

São armazenados os seguintes dados em LocalStorage:

* Nome: Nome do produto em formato de string.
* Descrição: Descrição do produto em formato de string.
* Quantidade: Quantidade do produto em formato de números.
* Selecionado: Se o produto foi selecionado ou não (boolean).
* Id: ID de cada produto para auxiliar nas buscas e no gerenciamento dos produtos (invisível ao usuário).

# Questionário

> ### A aplicação é original e não uma cópia da aplicação de um colega ou de uma aplicação já existente?
> #### Sim, apesar de ser baseada na aplicação Tô Ferrado ela possui elementos a mais com bastante diferenças.
***
> ### A aplicação tem pelo menos duas interfaces (telas ou páginas) independentes?
> #### Sim.
***
> ### A aplicação armazena e usa de forma relevante dados complexos (mais de um atributo)?
> #### Sim.
***
> ### A aplicação possui um manifesto para instalação no dispositivo do usuário?
> #### Sim.
***
> ### A aplicação possui um service worker que permite o funcionamento off-line?
> #### Sim.
***
> ### O código da minha aplicação possui comentários explicando cada operação?
> #### Sim.
***
> ### A aplicação está funcionando corretamente?
> #### Sim.
***
> ### A aplicação está completa?
> #### Sim.