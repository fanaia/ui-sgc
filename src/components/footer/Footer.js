import React from "react";
import { Link } from "react-router-dom";
import { CurrencyExchange, HandThumbsUpFill, CheckCircleFill } from "react-bootstrap-icons";
import Badge from "react-bootstrap/Badge";
import "./Footer.css";

const Footer = ({ consensosParaVer }) => {
  return (
    <footer className="footer">
      <nav>
        <ul className="footer-nav">
          <li>
            <div className="circle">
              <Link to="/auth/carteira">
                <CurrencyExchange size={40} />
              </Link>
            </div>
          </li>
          <li>
            <div className="circle" style={{ position: 'relative' }}>
              <Link to="/auth/consenso">
                <HandThumbsUpFill size={44} />
                {consensosParaVer > 0 && (
                  <Badge
                    pill
                    variant="success"
                    className="position-absolute"
                    style={{ top: '-5px', right: '-5px' }}
                  >
                    {consensosParaVer}
                  </Badge>
                )}
              </Link>
            </div>
          </li>
          <li>
            <div className="circle">
              <Link to="/auth/atividades">
                <CheckCircleFill size={40} />
              </Link>
            </div>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;