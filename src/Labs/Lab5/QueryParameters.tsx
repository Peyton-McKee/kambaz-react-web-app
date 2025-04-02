import { useState } from "react";
import { FormControl } from "react-bootstrap";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

const QueryParameters = () => {
  const [a, setA] = useState(10);
  const [b, setB] = useState(2);

  return (
    <div id="wd-query-parameters">
      <h3>Query Parameters</h3>
      <FormControl
        id="wd-query-parameter-a"
        className="mb-2"
        defaultValue={a}
        type="number"
        onChange={(e) => setA(parseFloat(e.target.value))}
      />
      <FormControl
        id="wd-query-parameter-b"
        className="mb-2"
        defaultValue={b}
        type="number"
        onChange={(e) => setB(parseFloat(e.target.value))}
      />
      <a
        id="wd-query-parameter-add"
        href={`${REMOTE_SERVER}/lab5/calculator?operation=add&a=${a}&b=${b}`}
      >
        Add {a} + {b}
      </a>
      <a
        id="wd-query-parameter-subtract"
        href={`${REMOTE_SERVER}/lab5/calculator?operation=subtract&a=${a}&b=${b}`}
      >
        Substract {a} - {b}
      </a>
      <a
        id="wd-query-parameter-multiply"
        href={`${REMOTE_SERVER}/lab5/calculator?operation=multiply&a=${a}&b=${b}`}
      >
        Multiply {a} x {b}
      </a>
      <a
        id="wd-query-parameter-divide"
        href={`${REMOTE_SERVER}/lab5/calculator?operation=divide&a=${a}&b=${b}`}
      >
        Divide {a} \ {b}
      </a>
      <hr />
    </div>
  );
};

export default QueryParameters;
