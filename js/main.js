window.addEventListener('DOMContentLoaded', () => {
	const obtenerArray = () => {
		// Obtiene el valor del input y lo convierte en un array de caracteres
		return (document.getElementById('numero').value).trim().split('');
	}

	const convertirASCII = (array) => {
		// Convierte los caracteres del array en un su codigo ascii
		return array.reduce((acc, el) => [...acc, el.charCodeAt(0)], []);
	}

	const convertirBinario = (array) => {
		// Convierte el codigo ascii en binario en cada elemento del arreglo
		let result = [];
		array.forEach(num => {
			let binary = (num % 2).toString();
			for (; num > 1;) {
				num = parseInt(num / 2);
				binary = (num % 2) + (binary);
			}
			result = [...result, binary];
		});
		return result;
	}

	const validar = () => {
		event.preventDefault();
		const myModal = new bootstrap.Modal('#resultadoModal', {
			keyboard: true
		});

		const input = obtenerArray();
		const ascii = convertirASCII(input);
		const binarios = convertirBinario(ascii);
		const transiciones = [
			/*q0 q1 q2 q3 q4 q5 q6 q7 q8 q9*/
			[-1, -1, 3, 4, 5, 9, 7, 8, 9, -1], // Introducido un 0
			[1, 2, 6, 4, 5, 9, -1, -1, 9, -1] // Introducido un 1
		];

		if (binarios.length === 0) {
			document.getElementById('resultado').innerHTML = "La palabra es inválida";
			return myModal.toggle(document.getElementById('resultadoModal'));
		}


		for (let i = 0; i < binarios.length; i++) {
			let estado = 0;
			for (let j = 0; j < binarios[i].length; j++) {
				estado = transiciones[binarios[i][j]][estado];

				if (estado === -1) {
					document.getElementById('resultado').innerHTML = "La palabra es inválida";
					return myModal.toggle(document.getElementById('resultadoModal'));
				};
			}
		}

		document.getElementById('resultado').innerHTML = "La palabra es válida";
		return myModal.toggle(document.getElementById('resultadoModal'));
	}

	document.getElementById('validar').addEventListener('click', validar);
});