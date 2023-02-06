import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {Form} from "react-bootstrap";

const CHUNK_SIZE = 1048576 * 3; //its 3MB, increase the number measure in mb

const uploader = function () {
    function Uploader() {
        this.file = null;
        this.chunkSize = CHUNK_SIZE;
        this.uniqueFileId = null;
    }

    Uploader.prototype.setFile = function(file) {
        if(!file)
            return;

        this.file = file;
    }

    Uploader.prototype.send = async function() {
        if(!this.file)
            return;

        const chunkQuantity = Math.ceil(this.file.size / this.chunkSize);
        this.queue = new Array(chunkQuantity).fill().map((_,index) => index);
        this.uniqueFileId = uuidv4();

        for (const chunkId of this.queue) {
            const sendSize = chunkId * this.chunkSize;
            const chunk = this.file.slice(sendSize, sendSize + this.chunkSize);

            const result = await this.sendChunk(chunk, chunkId, chunkId === this.queue[this.queue.length - 1]);
            console.log(result)
        }
    }

    Uploader.prototype.sendChunk = async function (chunk, chunkId, finish) {
        const formData = new FormData();
        formData.append("chunk", chunk);
        formData.append("finish", finish);

      return axios({
          method: "post",
          url: "http://localhost:8080/upload",
          data: formData,
          headers: {
              "Content-Type": "application/octet-stream",
              "ChunkId": chunkId,
              "UniqueFileId": this.uniqueFileId
          }
      });
    }

    const uploader = new Uploader();

    return {
        send: async function (file) {
            uploader.setFile(file);
            await uploader.send();

            return this;
        }
    }
}

export default uploader;
