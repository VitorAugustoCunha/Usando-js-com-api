const form = document.getElementById("form")
const cep = document.getElementById("cep")
const rua = document.getElementById("rua")
const cidade = document.getElementById("cidade")
const uf = document.getElementById("uf")
var doidera;
puxarUf();

form.addEventListener("submit", (e) => {
    e.preventDefault()
})


/*Usar o fetch aqui*/
function consultarCep(c, r, u, cd) {

    let cValor = c.value.replace(".","").replace("-", "")
    
    if(cValor != "" || c.cValor != null){
        let url = "https://viacep.com.br/ws/" + cValor + "/json/" 

        fetch(url).then(res => {
            return res.json()
        }).then(saida => {
            r.value = saida.logradouro
            cd.value = saida.localidade
            u.value = saida.uf
        })
        const p = document.getElementById("cep-invalido")
        
        if(validarCep(cValor)){
            cep.className = "form-control is-valid"
            p.style.display = "none"

        }else{
            cep.className = "form-control is-invalid"
            p.style.display = "block"

        }
    }
    
}
function puxarUf(){
    let url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    fetch(url).then(res => {
        return res.json()
    }).then(saida => {
        let select = document.getElementById("ufSel");
        for(index in saida) {
            select.options[select.options.length] = new Option(saida[index].sigla, index);
        }
    })
}
function puxarCidade(){
    let select = document.getElementById("cidadeSel");
    let url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/" +  puxarSigla(document.getElementById("ufSel").value) + "/mesorregioes"
    console.log(url)
    fetch(url).then(res =>{
        return res.json()}).then(saida => {
            for(index in saida) {
                select.options[select.options.length] = new Option(saida[index].sigla, index);
            }
        })
}
function puxarSigla(c){
    let url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    fetch(url).then(res => {
        return res.json()
    }).then(saida => {
    })
}

function validarCep(cv) {
    let re = /^[0-9]{8}$/
    return re.test(cv)
}



