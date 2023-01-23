import React, { useState } from "react";
import client from "@/service/ipfsclient";
import CryptoJS from "crypto-js";
function Upload() {
  const [file, setFile] = useState<File | null>(null);
  const [cid, setCid] = useState<string | null>(null);
  async function handleUpload() {
    // create a link
    const a = document.createElement("a");
    // add link to body
    document.body.appendChild(a);
    // remove link from body
    a.style.display = "none";
    // create file reader
    const reader = new FileReader();
    // read file
    // when file is read
    reader.onload = async (e: any) => {
      var encrypted = CryptoJS.AES.encrypt(e.target.result, "secret key");
      // add link to body
      a.href = "data:application/octet-stream," + encrypted;
      // set link download attribute
      a.download = file!.name + ".enc";
      // click link
      a.click();
      // upload ipfs
      const cid = await client.add(encrypted.toString());
      console.log(cid);
      setCid(cid.path);
    };
    reader.readAsDataURL(file!);

    // // decrpyt file
    // var decrypted = CryptoJS.AES.decrypt(encrypted, "secret key").toString(
    //   CryptoJS.enc.Latin1
    // );
    // a.href = decrypted;
    // a.download = file!.name;
    // a.click();
  }
  async function handleDecrpyt() {
    const a = document.createElement("a");
    // add link to body
    document.body.appendChild(a);
    // remove link from body
    a.style.display = "none";
    // get file
    console.log(cid);
    const res = await fetch("https://ppubldev.infura-ipfs.io/ipfs/" + cid, {
      method: "GET",
      headers: {
        "Content-Type": "application/octet-stream",
      },
    });
    const encrypted = await res.text();
    console.log(encrypted);
    var decrypted = CryptoJS.AES.decrypt(encrypted, "secret key").toString(
      CryptoJS.enc.Latin1
    );
    console.log(decrypted);
    a.href = decrypted;
    a.download = file!.name;
    a.click();

    //   // decrpyt file
    //   const reader = new FileReader();
    //   // read file
    //   // when file is read
    //   reader.onload = async (e: any) => {
    //     var encrypted = CryptoJS.AES.encrypt(e.target.result, "secret key");
    //     // add link to body
    //     a.href = "data:application/octet-stream," + encrypted;
    //     // set link download attribute
    //     a.download = file!.name + ".enc";
    //     // click link
    //     a.click();
    //   };
    //   reader.readAsDataURL(file!);
  }
  return (
    <div>
      {/* take file */}
      <input
        onChange={(event: any) => {
          const file = event.target.files[0];
          setFile(file);
        }}
        type="file"
        accept="application/pdf"
      />
      <button onClick={handleUpload}>Upload PDF</button>
      <button onClick={handleDecrpyt}>DEC PDF</button>
    </div>
  );
}

export default Upload;
