import { showDetail } from "../index.js";

const urlParams = new URLSearchParams(window.location.search);
const initValue = urlParams.get("id");


showDetail(initValue)


