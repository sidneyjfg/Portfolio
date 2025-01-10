import React, { useState } from "react";

function JSONConverter() {
  const [xmlFiles, setXmlFiles] = useState([]); // Lista de arquivos XML selecionados
  const [outputs, setOutputs] = useState([]); // Resultados JSON formatados
  const [errors, setErrors] = useState([]); // Mensagens de erro para cada arquivo

  // Função para processar o XML
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files); // Converte FileList para Array
    setXmlFiles(files);
    setOutputs([]);
    setErrors([]);
  };

  // Função principal para converter XML para JSON
  const convertXmlToJson = () => {
    if (xmlFiles.length === 0) {
      setErrors(["Please select at least one valid XML file."]);
      return;
    }

    const newOutputs = [];
    const newErrors = [];

    xmlFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(reader.result, "application/xml");

          // Verificar erros no XML
          if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
            throw new Error(`Invalid XML file: ${file.name}`);
          }

          const jsonResult = extractData(xmlDoc);
          newOutputs.push({ fileName: file.name, json: jsonResult });
        } catch (err) {
          newErrors.push(err.message || `An error occurred while processing ${file.name}`);
        }

        // Atualiza os estados após processar todos os arquivos
        if (newOutputs.length + newErrors.length === xmlFiles.length) {
          setOutputs(newOutputs);
          setErrors(newErrors);
        }
      };
      reader.readAsText(file);
    });
  };

  // Função para limpar os dados na tela
  const clearAll = () => {
    setXmlFiles([]);
    setOutputs([]);
    setErrors([]);
    document.querySelector("input[type='file']").value = ""; // Limpa o input de arquivos
  };

  // Função auxiliar para extrair dados do XML
  const extractData = (xmlDoc) => {
    const extractValue = (path, context = xmlDoc) => {
      const nodes = path.split(".");
      let currentNode = context;
      for (let node of nodes) {
        currentNode = currentNode.querySelector(node);
        if (!currentNode) return null;
      }
      return currentNode.textContent;
    };
  
    const extractAfterColon = (value) => {
      if (value && value.includes(":")) {
        const index = value.indexOf(":") + 1;
        return value.substring(index, index + 16).trim();
      }
      return value || null;
    };
  
    // Função para extrair todos os produtos
    const extractProducts = () => {
      const productNodes = xmlDoc.querySelectorAll("det"); // Busca todos os nós <det>
      return Array.from(productNodes).map((productNode) => ({
        sku: extractValue("prod cProd", productNode),
        quantidade: extractValue("prod qCom", productNode),
        precoUnitario: extractValue("prod vUnCom", productNode)?.slice(0, -6),
        idPedidoCanal: extractAfterColon(extractValue("infAdProd", productNode)),
        valorComissao: 0,
      }));
    };
  
    // Mapear os dados
    return {
      idPedidoHub: extractAfterColon(extractValue("det infAdProd")),
      idPedidoCanal: extractAfterColon(extractValue("det infAdProd")),
      dataPedido: extractValue("ide dhEmi")?.slice(0, -6) + ".323Z",
      dataEntrega: extractValue("ide dhEmi")?.slice(0, -15),
      idCanal: 2,
      idLoja: "1",
      idHub: 2,
      observacoesEntrega: null,
      status: 0,
      entrega: {
        cep: extractValue("enderDest CEP"),
        numero: extractValue("enderDest nro"),
        endereco: extractValue("enderDest xLgr"),
        complemento: extractValue("enderDest xCpl"),
        bairro: extractValue("enderDest xBairro"),
        cidade: extractValue("enderDest xMun"),
        estado: extractValue("enderDest UF"),
      },
      cliente: {
        cnpjCpf: extractValue("dest CNPJ") || extractValue("dest CPF") || null,
        ie: "",
        rg: "",
        nome: extractValue("dest xNome"),
        ddd: "11",
        telefone: null,
        celular: "111111111",
        email:
          extractAfterColon(extractValue("det infAdProd")) + "@mercadolibre.com",
        nomeFantasia: extractValue("dest xNome"),
      },
      pagamento: {
        tipoPagamento: 2,
        bandeira: 0,
        valorDesconto: extractValue("total ICMSTot vDesc"),
        valorFrete: extractValue("total ICMSTot vFrete"),
        valorTotal: extractValue("total ICMSTot vNF"),
        parcelas: 1,
      },
      fulfillment: 1,
      produtos: extractProducts(), // Extrai todos os produtos
    };
  };
  

  return (
    <div style={{ marginTop: "80px", padding: "20px", textAlign: "center" }}>
      <h1>XML to JSON Converter</h1>
      <input type="file" accept=".xml" multiple onChange={handleFileUpload} />
      <div style={{ marginTop: "10px" }}>
        <button
          onClick={convertXmlToJson}
          style={{
            marginRight: "10px",
            padding: "10px 20px",
            background: "#2563eb",
            color: "#ffffff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Convert to JSON
        </button>
        <button
          onClick={clearAll}
          style={{
            padding: "10px 20px",
            background: "#d9534f",
            color: "#ffffff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Clear All
        </button>
      </div>
      {errors.length > 0 && (
        <div style={{ color: "red", marginTop: "10px" }}>
          <strong>Errors:</strong>
          <ul>
            {errors.map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        </div>
      )}
      {outputs.length > 0 && (
        <div style={{ marginTop: "20px", textAlign: "left" }}>
          <h3>Output JSON:</h3>
          {outputs.map((output, index) => (
            <div key={index}>
              <h4>File: {output.fileName}</h4>
              <pre
                style={{
                  background: "#f3f4f6",
                  padding: "10px",
                  borderRadius: "5px",
                  overflowX: "auto",
                }}
              >
                {JSON.stringify(output.json, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default JSONConverter;
