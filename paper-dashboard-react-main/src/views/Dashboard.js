/*!

=========================================================
* Paper Dashboard React - v1.3.1
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
//import archiver from "archiver";
import { generationQr } from "backend";
//import { each, get } from "jquery";
import React, { useState } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import "../styles.css"

// react plugin used to create charts
import { Line, Pie } from "react-chartjs-2";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";

function Dashboard() {
  const [size, setSize] = useState();
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();
  const [msg, setMsg] = useState("");
  //const [qrImageFile, setQrImageFile] = useState([]);
  //let cpt = 0;
 
  const saveZip = (filename, urls) => {
    if(!urls) return;

    const zip = new JSZip();
    const folder = zip.folder("files"); // folder name where all files will be placed in 

    urls.forEach((url) => {
        const blobPromise = fetch(url).then((r) => {
            if (r.status === 200) return r.blob();
            return Promise.reject(new Error(r.statusText));
        });
        const name = url.substring(url.lastIndexOf("/") + 1);
        folder.file(name, blobPromise);
    });

    zip.generateAsync({ type: "blob" }).then((blob) =>  saveAs(blob, filename));

};

  
  const genererQr = async () =>{
    const urls = [];
    for(let i = 0; i < size; i++){
      const blobData = await generationQr(i, width, height);
      urls.push(blobData.data);
      //console.log(blobData.data);
    }

    //setQrImageFile(urls);
    saveZip("download.zip", urls);
    setMsg("Vous avez générer "+ size +" Qr Code(s)");
  
  };


  return (
    <>
      <div className="content">
      <table className="tableQr">
              <tr>
                <td>
                  <label>Taille:</label>
                </td>
                <td>
                    <input type="number" name="size" className="form-control" value={size}
                      onChange={(evt) => setSize(evt.target.value)} />
                </td>
                <td>
                  <label>Largeur:</label>
                </td>
                <td>
                  <input type="number" name="width" className="form-control" value={width}
                    onChange={(evt) => setWidth(evt.target.value)} />
                </td>
                <td>
                  <label>Hauteur:</label>
                </td>
                <td>
                  <input type="number" name="height" className="form-control" value={height}
                    onChange={(evt) => setHeight(evt.target.value)} />
                </td>
                <td rowspan="2">
                  <button onClick={genererQr} className="btn btn-sm btn-primary">Generer</button>
                </td>
              </tr>
              <tr>
                <td colspan = "7">
                {msg && <p className="fs-4 text-center text-success">{msg}</p>}
                </td>
              </tr>
              {/* <tr>

                    {qrImageFile.map((qr) => (
                     <td><img src={""+ qr + ""} alt="qrImg"/> </td>
                       
                    ))}

              </tr> */}
          </table>
      </div>
    </>
  );
}

export default Dashboard;
