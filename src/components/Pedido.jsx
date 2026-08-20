import { useState} from "react"

//Array de objetos e estado inicial do cardapio
const cardapio=[
    { id: 1, nome: "Combo-01", preco: 25.00, didponivel: true, quantidade: 0 },
    { id: 2, nome: "Combo-02", preco: 35.00, didponivel: true, quantidade: 0 },
    { id: 3, nome: "Combo-03", preco: 45.00, didponivel: false, quantidade: 0 },
    { id: 4, nome: "Combo-04", preco: 55.00, didponivel: true, quantidade: 0 },
];

const Pedido = () => {

    //Hook - useState - Manipula o estado da variavel
    //Estados para gerenciar a lista dos items 
    const[items,setItems]=useState(cardapio);
    const[status,setStatus]=useState("");
    const[enviar,setEnviar]=useState(false);
    
    //Valor fixo adicionado ao total quando tiver itemn no carrinho 
    const taxaEntrega=5.00;

    //função que altera a quantidade de um pedido
    const alterarQuantidade =(id,valor)=>{
    //usa função updater para garantir o valor mais recente do estado 
        setItems(prev=>
        //MAP: Percorre a lista para criar um NOVO array sem modificar o original (imutabilidade)
            prev.map(item=>
                //TERNáRIO: Verifica se o item da iteração atual é o que deve ser alterado
                //Spred (...item): copia as propriedades do item e atualiza apenas a quantidade mantendo o resto
                //Math.max : Objeto que garante que a quantidade nunca seja menor que 0
                //Item: retorna o item intacto caso o id não corresponda  
                item.id === id ? { ...item, quantidade: Math.max(0, item.quantidade + valor) } :item
            )
        )
    }

    //FILTER - Selecione apenas os produtos disponiveis e do carrinho 
    const produtosDisponiveis = items.filter(item=> item.disponivel);
    const carrinho = items.filter(item=>item.quantidade>0);

    //REDUCE - Calcula a soma dos items (preco* quantidade) e adiciona a taxa de Entrega
    const subtotal=carrinho.reduce((ac,item) => ac + item.preco * item.quantidade,0)
    const total = subtotal >0 ? subtotal + taxaEntrega:0;

    //SIMULAÇÃO DO CICLO DE VIDA DA ENTREGA USANDO OS TEMPORIZADORES ASSINCRONOS
    const confimacaoPedido=()=> {
        setEnviar(true);
        setStatus("Restaurante preparando seu pedido...");
        setTimeout(()=> {
            setStatus("Seu pedido sai para entrega")
            setEnviar(false)
        },5000);
        setTimeout(() => {
            setStatus("Seu pedido foi entregue com sucesso")
            setEnviar(false)
        }, 10000)
    }

  return (

    <>
      
    </>
  )
}

export default Pedido
