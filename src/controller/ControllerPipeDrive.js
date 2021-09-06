import api from "../api/api.js"
import bling_api from "../api/bling_api.js";
import Opportunity from "../model/Opportunity.js";


export default {
    async pipeDrive(req, res) {
        const { data } = await api();

        const deals = await data.data.map(
            ({ id, title, status, value, won_time }) => ({
                id,
                title,
                status,
                value,
                won_time
            })
        );

        const oportuni = await deals.map(({ title, status, value, won_time }) => {
            Opportunity.create({
                title,
                status,
                value,
                won_time
            });

            bling_api.post(
                `pedido/json/?apikey=${process.env.KEY_BLING}&xml=${encodeURI(`<?xml version="1.0" encoding="utf-8"?>
                <pedido>
                    <cliente>
                        <nome>${title}</nome>
                        <tipoPessoa>J</tipoPessoa>
                        <endereco>Rua 13 Quadra 21 Lote 12</endereco>
                        <cpf_cnpj>00000000000000</cpf_cnpj>
                        <ie_rg>3067663000</ie_rg>
                        <numero>392</numero>
                        <complemento>Sala 02</complemento>
                        <bairro>Arco verde</bairro>
                        <cep>95.700-000</cep>
                        <cidade>Anápolis - GO</cidade>
                        <uf>RS</uf>
                        <fone>62991518841</fone>
                        <email>jonathangrouproot@gmail.com</email>
                    </cliente>
                    <transporte>
                        <transportadora>Transportadora Braz</transportadora>
                        <tipo_frete>R</tipo_frete>
                        <servico_correios>SEDEX - CONTRATO</servico_correios>
                        <dados_etiqueta>
                            <nome>Endereço de entrega</nome>
                            <endereco>Rua 13 Quadra 21 lote 12</endereco>
                            <numero>12</numero>
                            <complemento>Ao lado da academia netus</complemento>
                            <municipio>Anápolis</municipio>
                            <uf>GO</uf>
                            <cep>75105-390</cep>
                            <bairro>Anápolis</bairro>
                        </dados_etiqueta>
                        <volumes>
                            <volume>
                                <servico>SEDEX - CONTRATO</servico>
                                <codigoRastreamento></codigoRastreamento>
                            </volume>
                        </volumes>
                    </transporte>
                    <itens>
                        <item>
                            <codigo>001</codigo>
                            <descricao>Teclado Mecánico</descricao>
                            <un>Pç</un>
                            <qtde>10</qtde>
                            <vlr_unit>350.68</vlr_unit>
                        </item>
                    </itens>
                    <parcelas>
                        <parcela>
                            <data>01/09/2009</data>
                            <vlr>${value}</vlr>
                            <obs>Teste obs 1</obs>
                        </parcela>
                    </parcelas>
                    <vlr_frete>15</vlr_frete>
                    <vlr_desconto>10</vlr_desconto>
                    <obs>Testando o campo observações do pedido</obs>
                    <obs_internas>Testando o campo observações internas do pedido</obs_internas>
              </pedido>`)}`
            );

        });
        return res.status(200).json({Ok: "Successfully imported" });
    }
}
