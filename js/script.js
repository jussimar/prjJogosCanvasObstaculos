window.onload = function(){
    iniciarJogo();
    // ações executadas enquanto é segurado o botão do mouse
    document.querySelector("#direita").addEventListener("mousedown", function(){
        direita();
    });

    document.querySelector("#esquerda").addEventListener("mousedown", function(){
        esquerda();
    });

    document.querySelector("#subir").addEventListener("mousedown", function(){
        subir();
    });

    document.querySelector("#descer").addEventListener("mousedown", function(){
        descer();
    });
    // ações executadas quando solta o botão do mouse
    document.querySelector("#direita").addEventListener("mouseup", function(){
        frear();
    });

    document.querySelector("#esquerda").addEventListener("mouseup", function(){
        frear();
    });

    document.querySelector("#subir").addEventListener("mouseup", function(){
        frear();
    });

    document.querySelector("#descer").addEventListener("mouseup", function(){
        frear();
    });
}

var personagemObj;

var obstaculo;

function iniciarJogo(){
    areaJogo.start();
    personagemObj = new componente('#f00',10,120,60,60);
    obstaculo = new componente('green',300,120,200,10);
}

let areaJogo = {
    canvas: document.createElement("canvas"),
    start: function(){
        this.canvas.width = 600,
        this.canvas.height = 400,
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.intervalo = setInterval(atualizaAreaJogo, 20);
    },
    limpar: function(){
        this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
    },
    parar: function(){
        clearInterval(this.interval);
    }
}

function componente(cor, x, y, largura, altura, ){
    this.altura = altura,
    this.largura = largura,
    this.x = x,
    this.y = y,
    this.velocidadeX = 0,
    this.velocidadeY = 0,
    this.atualiza = function(){
        contexto = areaJogo.context;
        contexto.fillStyle = cor,
        contexto.fillRect(this.x, this.y, this.altura, this.largura);
    },
    this.novaPosicao = function(){
        this.x += this.velocidadeX;
        this.y += this.velocidadeY;
    },
    this.bater = function(obj){
        //pegando posição do personagem
        let esquerda = this.x;
        let direita = this.x + this.largura;
        let superior =  this.y;
        let inferior = this.y + this.altura;
        //pegando a posição do obstaculo
        let objEsquerda = obj.x;
        let objDireita = obj.x + obj.altura;
        let objSuperior =  this.y;
        let objInferior = this.y + this.largura;
        
        let batida = true;

        if(
            (inferior < objSuperior) || 
            (superior > objInferior) || 
            (direita < objEsquerda) || 
            (esquerda > objDireita)
        ){
            batida = false;
            
        }

        return batida;

    }
    
}
function atualizaAreaJogo(){
    if(personagemObj.bater(obstaculo)){
        areaJogo.parar();
    }else{
        areaJogo.limpar();
        obstaculo.atualiza();
        personagemObj.novaPosicao();
        personagemObj.x += personagemObj.velocidadeX;
        personagemObj.Y += personagemObj.velocidadeY;
        personagemObj.atualiza();
    }
    
}

function subir(){
    personagemObj.velocidadeY -= 1; 
}

function descer(){
    personagemObj.velocidadeY += 1; 
}

function esquerda(){
    personagemObj.velocidadeX -= 1; 
}

function direita(){
    personagemObj.velocidadeX += 1; 
}

function frear(){
    personagemObj.velocidadeX = 0;
    personagemObj.velocidadeY = 0;
}