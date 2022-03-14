import { BayesNetworkData } from "./bayes_network";

// https://stackoverflow.com/questions/13405129/javascript-create-and-save-file
function download(data: string, filename: string, type: string) {
    const file = new Blob([data], {type: type});
    const a = document.createElement("a"), url = URL.createObjectURL(file);
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);  
    }, 0); 
}


export const saveNetwork = (network: BayesNetworkData) => {
    const json_dump = JSON.stringify(network);
    download(json_dump, "BayesNetwork.json", "json")
}
