import useWindowSize from "../hooks/useWindowSize";

export const Navigation = (props) => {
  const windowSize = useWindowSize();
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        width: "100%",
        zIndex: 100,
        background: "white",
        marginBottom: 0,
        marginRight: 0,
        marginLeft: 0,
        paddingLeft: 0,
        paddingRight: 0,
      }}
      id="menu"
      className="navbar navbar-default navbar-fixed-top"
    >
      <div
        className="container"
        style={{
          margin: 0,
          padding: 0,
          width: "100%",
        }}
      >
        <div
          className="navbar-header"
          style={{
            width: windowSize < 800 ? "300px" : "20%",
            display: "flex",
            justifyContent: "center",
            marginLeft: 30,
          }}
        >
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="#page-top">
           Code Sharing Platform
          </a>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
          style={{
            width: "80%",
          }}
        >
         
        </div>
      </div>
    </nav>
  );
};
