async function consultarRegistros() {
    const inputNumber = document.getElementById('inputNumber');
    const num = BigInt(inputNumber.value);
    
    const registroList = document.getElementById('registroList');
    registroList.innerHTML = '';

    try {
        const response = await fetch(`https://trx-cli.azurewebsites.net/users/${num}`);
        if (!response.ok) {
            throw new Error('No se pudo obtener los registros.');
        }
        const data = await response.json();
        
        if (data.length === 0) {
            registroList.innerHTML = '<li>No se encontraron registros para el número ingresado.</li>';
        } else {
            data.forEach(registro => {
                const li = document.createElement('li');
                li.innerText = `Documento:${registro.documento}\n Tipo de documento:${registro.tipo_doc}\n Categoria:${registro.categoria}\n Monto transaccion:${registro.mnt_trx_mm}\n Numero transaccion:${registro.num_trx}\n Porcentaje del monto:${registro.pct_mnt_tot}\n Porcentaje numero trx:${registro.pct_num_trx_tot}`;
                registroList.appendChild(li);
            });
        }
    } catch (error) {
        registroList.innerHTML = `<li>Error: ${error.message}</li>`;
    }
}
