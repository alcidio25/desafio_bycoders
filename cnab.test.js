const cnab = require('./app/controllers/cnab');

describe("Testes", () => {
    it("Deve retornar 17 quando o tipo de operação for 5 ou 8, e os saldos forem 2, 5, 10", () => {
       const operacao = [
          {tipo: 5, valor: 2},
          {tipo: 8, valor: 5},
          {tipo: 8, valor: 10},
       ];
       const valor = cnab.calcularSaldoTotal(operacao);
       expect(valor.saldo).toBe(17);
    })
    
    it("Deve retornar Financiamento quando o tipo de transação for 3", () => {
       const transacao = [{tipo: 3}];
        const valor = cnab.formatarTransacoes(transacao);
       expect('Financiamento').toEqual(expect.stringContaining(valor[0].operacao));
    });
    
    it("Deve retornar uma data válida após a conversão", () => {
        const data = cnab.formatarData("20210529");
       expect('2021-05-29').toEqual(expect.stringContaining(data));
    });
    
    it("Deve retornar a hora válida após a conversão", () => {
        const data = cnab.formatarHora("163555");
       expect('16:35:55').toEqual(expect.stringContaining(data));
    });
    
    it("Deve retornar true após a validação do tamanho de cada atributo", () => {
        objecto = {
               tipo: '4',
               data: '20190601',
               valor: "0000050617",
               cpf: '84515254073',
               cartao: '1234****2231',
               hora: '100000',
               dono: 'MARCOS PEREIRA',
               nome: 'MERCADO DA AVENIDA '
         }
        console.log(cnab.validarCNAB(objecto))
       expect(cnab.validarCNAB(objecto)).toBeTruthy();
    });
      
    
    it("Deve retornar uma objecto com os dados do CNAB após a conversão o arquivo", async () => {
        cnabfile = './app/files/teste.txt';
        const valor = await cnab.converterCNAB(cnabfile);
        objecto = [
             {
               tipo: '4',
               data: '20190601',
               valor: 506.17,
               cpf: '84515254073',
               cartao: '1234****2231',
               hora: '100000',
               dono: 'MARCOS PEREIRA',
               nome: 'MERCADO DA AVENIDA '
             }
        ]
        expect(valor[0]).toMatchObject(objecto[0]);
    });
});