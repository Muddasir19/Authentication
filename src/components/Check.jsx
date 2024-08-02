import React from "react";

const Check = () => {
  return (
   
      <div className={"mainContainer"}>
        <div className={"titleContainer"}>
          <div>Login</div>
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            value={""}
            placeholder=""
            onChange={(ev) => set(ev.target.value)}
            className={"inputBox"}
          />
          <label className="errorLabel">{}</label>
        </div>
        <br />
        <div className={"inputContainer"}>
          <input
            className={"inputButton"}
            type="button"
            //onClick={}
            value={""}
          />
        </div>
      </div>
    
  );
};

export default Check;
