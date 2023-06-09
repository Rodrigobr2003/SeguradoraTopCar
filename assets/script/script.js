const section = document.querySelector('#section')
let css = undefined
let javaScriptDocument = undefined
let body = document.querySelector(".body")

//#region CRIA ARQUIVO CSS
function criarCss(idPag) {
    let xhr = new XMLHttpRequest()
    let arquivo = idPag;

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            if (!css) {
                css = document.createElement('link')
                css.rel = 'stylesheet'
                css.href = xhr.responseURL
                document.head.appendChild(css)
            }

            let cssRemoval = document.querySelector('.apagarCss')

            if (cssRemoval) {
                cssRemoval.remove()
            }
            
            let conteudoCss = document.createElement('link')
            conteudoCss.rel = 'stylesheet'
            conteudoCss.href = `assets/css/${arquivo}.css`
            conteudoCss.classList.add('apagarCss')
            document.head.appendChild(conteudoCss)

        }
    }
    xhr.open("GET", "assets/css/header.css")
    xhr.send()
}
//#endregion

//#region WINDOW LOAD
window.addEventListener('load', function (params) {
    let id = 'conteudo'
    criarCss(id)
    criarJs(id)
})
//#endregion

//#region CARREGA AUTOMATICAMENTE O CONTEUDO DE HOME
document.addEventListener("DOMContentLoaded", function () {
    let url = 'conteudo.html'
    
    let xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            section.innerHTML = xhr.response
        }
    }
    xhr.open("GET", url)
    xhr.send()
});
//#endregion

//#region MUDANÇA DE PÁGINAS
let botoes = document.querySelectorAll('.linkNav')
let btnId = undefined

botoes.forEach((botao) => {
    trocaTela(botao)
});

function trocaTela(botao) {
    botao.addEventListener('click', function () {
        btnId = botao.id
        carregaArquivo(btnId)
    })
}

export function carregaArquivo(btnId) {
    let xhr = new XMLHttpRequest()

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            section.innerHTML = xhr.response
        }
    }
    xhr.open('GET', `${btnId}.html`)
    xhr.send()

    criarCss(btnId)
    criarJs(btnId)
}
//#endregion

//#region CRIA ARQUIVO JS PARA PAGINA
export function criarJs(idPag) {
    let xhr = new XMLHttpRequest();
    let arquivo = idPag;

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            
            if (!javaScriptDocument) {
                javaScriptDocument = document.createElement('script')
                javaScriptDocument.type = 'module'
                javaScriptDocument.id = "apagarJs"
                javaScriptDocument.src = xhr.responseURL
                body.appendChild(javaScriptDocument)
            }

            let jsRemoval = document.querySelector('#apagarJs')

            if (jsRemoval) {
                jsRemoval.remove()
            }

            let conteudoJs = document.createElement('script')
            conteudoJs.type = 'module'
            conteudoJs.src = `assets/script/${arquivo}.js`
            conteudoJs.id = "apagarJs"
            body.appendChild(conteudoJs)
        }
    }
    xhr.open("GET", 'assets/script/conteudo.js')
    xhr.send()
}
//#endregion
