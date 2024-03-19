const container = document.querySelector('.filtro');
const template = document.getElementById('checkbox-template');

for (let i = 1; i <= 3; i++) {
  const clone = document.importNode(template.content, true);
  const checkboxId = `cbk${i}-65`;

  clone.querySelector('label').setAttribute('for', checkboxId);
  clone.querySelector('label').classList.add('check');
  clone.querySelector('input').setAttribute('id', checkboxId);




  clone.querySelector('input').addEventListener('change', function() {
    const seleccionada = container.querySelectorAll('.text');
    if (this.checked) {
      localStorage.setItem(`opcionSeleccionada${i}`,  seleccionada[i-1].textContent);
    }


  });

  container.appendChild(clone);
}
