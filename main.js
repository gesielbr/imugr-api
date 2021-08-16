function Atualizar() {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer a3e5a6de5258cf17927c2969a4f4cc48c11d8e9a"
  );
  // myHeaders.append("Authorization", "Client-ID 106d2cd587c640f");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("https://api.imgur.com/3/album/GlmDuUk", requestOptions) //CUcPd27
    .then((response) => response.text())
    .then((result) =>
      (function (result) {
        console.log("teste", result.length);
        $("#fotos").html("");

        JSON.parse(result).data.images.forEach(function (item) {
          $("#fotos").append(`
              <div class="col-md-4 col-lg-2 image-gallery mb-3">
              <div class="img-container">
                <img
                  class="img-fluid imagem-galeria"
                  src="${item.link}"
                  alt=""
                  srcset=""
                />
                </div>
                <button class="btn botao-deletar-imagem img-delete" data-id="${item.id}"><i class="fa fa-trash"></i></button>
              </div>`);
        });

        $(".img-delete").on("click", function (ev) {
          let _confirm = confirm("Deseja excluir este registro?");
          if (_confirm) {
            var imageId = $(this).data("id");
            var myHeaders = new Headers();
            myHeaders.append(
              "Authorization",
              "Bearer a3e5a6de5258cf17927c2969a4f4cc48c11d8e9a"
            );
            // myHeaders.append("Authorization", "Client-ID 106d2cd587c640f");
            var requestOptions = {
              method: "DELETE",
              headers: myHeaders,
              // body: formdata,
            };
          }

          fetch("https://api.imgur.com/3/image/" + imageId, requestOptions)
            .then((data) => data.json())
            .then((data) =>
              (function (data) {
                Atualizar();
                console.log(data);
              })(data)
            )
            .catch((error) => console.log("error", error));
        });
      })(result)
    )
    .catch((error) => console.log("error", error));
}

// SELECIONAR IMG
$("input[type=file]").on("change", function () {
  var $files = $(this).get(0).files;
  console.log($files);

  if ($files.length) {
    // Reject big files
    if ($files[0].size > $(this).data("max-size") * 1024) {
      console.log("Please select a smaller file");
      return false;
    }

    // Begin file upload
    console.log("Uploading file to Imgur..");

    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer a3e5a6de5258cf17927c2969a4f4cc48c11d8e9a"
    );
    // myHeaders.append("Authorization", "Client-ID 106d2cd587c640f");

    var formdata = new FormData();
    formdata.append("image", $files[0]);
    formdata.append("album", "GlmDuUk");
    // Primavera - "id": "CUcPd27", "deletehash": "91bZZXiqaaQ078A"
    //Outono "id": "GlmDuUk", "deletehash": "tiNs1NwFomnzaH0"
    //formdata.append("type", 'file');

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      // redirect: 'follow',
      // mode: 'no-cors'
    };

    fetch("https://api.imgur.com/3/image", requestOptions)
      .then((data) => data.json())
      .then((data) =>
        (function (data) {
          Atualizar();
          console.log(data);
        })(data)
      )
      .catch((error) => console.log("error", error));
  }
});
/*
https://imgur.com/#
access_token=a3e5a6de5258cf17927c2969a4f4cc48c11d8e9a
&expires_in=315360000
&token_type=bearer
&refresh_token=9e6c4b7483a06faf9e13d41824af5cfa4c060fc7
&account_username=gesielbr&account_id=153374645
*/

Atualizar();
