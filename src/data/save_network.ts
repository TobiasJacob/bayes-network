import { ChangeEvent } from "react";
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

// https://stackoverflow.com/questions/3582671/how-to-open-a-local-disk-file-with-javascript
const readSingleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    return new Promise<string>((resolve) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }
        const reader = new FileReader();
        reader.onload = function(e) {
            const contents = e.target.result;
            console.log(contents);
            resolve(String(contents));
        };
        reader.readAsText(file);
    })
}

export const saveNetwork = (network: BayesNetworkData) => {
    /**
     * Downloads the network.
     */
    const json_dump = JSON.stringify(network);
    download(json_dump, "BayesNetwork.json", "json")
}

export const loadNetwork = async (e: ChangeEvent<HTMLInputElement>, setNetwork: (net: BayesNetworkData) => void) => {
    /**
     * Let's the user open a saved network.
     */
    e.preventDefault();
    const json_input = await readSingleFile(e);
    const network = JSON.parse(json_input);
    setNetwork(network);
}
