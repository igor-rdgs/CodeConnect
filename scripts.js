const uploadBtn = document.getElementById("upload-btn");
const inputUpload = document.getElementById("image-upload");

uploadBtn.addEventListener("click", () => {
  inputUpload.click();
})

function lerConteudoDoArquivo(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();

    leitor.onload = () => {
      resolve({ url: leitor.result, nome: arquivo.name })
    }

    leitor.onerror = () => {
      reject(`Erro na leitura do arquivo ${arquivo.name}`)
    }

    leitor.readAsDataURL(arquivo);
  });
}

const imagemPrincipal = document.querySelector(".main-imagem");
const nomeDaImagem = document.querySelector(".container-imagem-nome p");

inputUpload.addEventListener("change", async (evento) => {
  const arquivo = evento.target.files[0];
  if (arquivo) {
    try {
      const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
      imagemPrincipal.src = conteudoDoArquivo.url;
      nomeDaImagem.textContent = conteudoDoArquivo.nome;
    } catch (erro) {
      console.error(`Erro na leitura do arquivo`)
    }
  }
})

const inputTags = document.getElementById("input-tags");
const listaTags = document.querySelector(".lista-tags");



listaTags.addEventListener("click", (evento) => {
  if(evento.target.classList.contains("remove-tag")) {
    const tagARemover = evento.target.parentElement;
    listaTags.removeChild(tagARemover);
  }
})

const tagsDisponiveis = ["Front-end", "Programação", "Data Science", "Full-stack", "HTML", "CSS", "JavaScript"];

async function verificaTagsDisponiveis(tagTexto) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tagsDisponiveis.includes(tagTexto));
    }, 1000)
  })
}

inputTags.addEventListener("keypress", async (evento) => {
  if (evento.key === "Enter") {
    evento.preventDefault();
    const textoTag = inputTags.value.trim();
    if (textoTag !== "") {
      try {
        const tagExiste = await verificaTagsDisponiveis(textoTag);
        if (tagExiste) {
          const novaTag = document.createElement('li');
          novaTag.innerHTML = `<p>${textoTag}</p> <img src= "./img/close-black.svg" class="remove-tag" alt="remove">`;
          listaTags.appendChild(novaTag);
          inputTags.value = "";
        } else {
          alert("Tag não foi encontrada.");
        }
      } catch (error) {
        console.error("Erro ao verificar a existência da tag");
        alert("Erro ao verificar a existência da tag. Verifique o console.");
      }
      
    }
  }
})

const botaoPublicar = document.querySelector(".botao-publicar");

botaoPublicar.addEventListener("click", async (evento) => {
  evento.preventDefault();

  const nomeDoProjeto = document.getElementById("nome").value;
  const descricaoDoProjeto = document.getElementById("descricao").value;
  const tagsProjeto = Array.from(listaTags.querySelectorAll("p")).map((tag) => tag.textContent);

  try {
    const resultado = await publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto);
    console.log(resultado);
    alert("Tudo certo!");
  } catch (error) {
    console.error("Deu errado: ", error);
    alert("Deu tudo errado!");
  }
})

async function publicarProjeto(nomeDoProjeto, descricaoProjeto, tagsProjeto) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const deuCerto = Math.random() > 0.5;

      if (deuCerto) {
        resolve("Projeto publicado com sucesso.")
      } else {
        reject("Erro ao publicar o projeto.")
      }
    }, 2000)
  })
}

const botaoDescartar = document.querySelector(".botao-descartar");

botaoDescartar.addEventListener("click", (evento) => {
  evento.preventDefault();

  const formulario = document.querySelector("form");
  formulario.reset();

  listaTags.innerHTML = "";

  imagemPrincipal.src = "./img/imagem1.png";
  nomeDaImagem.textContent = "image_projeto.png";
})