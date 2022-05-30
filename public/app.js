const resultOutput = document.querySelector(".result");

let loading = false;

let handleClick = async () => {
  const url = document.querySelector("#url").value;
  resultOutput.innerHTML = "";

  loading = true;
  isLoading(true);
  if (!url) {
    alert("input your URL,please!");
    isLoading(false);
    return;
  } else {
    const response = await fetch(`/api/v1?url=${url}`);

    if (response.status !== 200) {
      isLoading(false);
      resultOutput.innerHTML =
        "<h2 class='text-danger mt-5'>URL is not valid...</h2>";
      return;
    } else {
      const { issues } = await response.json();
      console.log(issues);
      displayResult(issues);
      isLoading(false);
    }
  }
};

const displayResult = (issues) => {
  if (issues.length === 0) {
    resultOutput.innerHTML = "<h2 id='succes'>Good website</h2>";
  } else {
    issues.forEach((element) => {
      const output = `
      <div class="card mb-5 bg-warning mt-3">
         <div class="card-body">
          <h4><span>Message</span> : ${element.message}</h4>
          <p><span>Code</span> : ${element.code} </p>
          <p><span>Element</span> : ${escapeHTML(element.context)}</p>
         </div>
        </div>
      `;
      resultOutput.innerHTML += output;
    });
  }
};

let isLoading = (loading) => {
  if (loading) {
    document.querySelector(".loader").style.display = "block";
  } else {
    document.querySelector(".loader").style.display = "none";
  }
};

document.querySelector("button").addEventListener("click", handleClick);
const escapeHTML = (html) => {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};
