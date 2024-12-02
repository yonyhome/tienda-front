import React from "react";

const GuaranteesAndReturns = () => {
  return (
    <div style={{ fontFamily: "Helvetica, Helvetica Neue, Arial, Lucida Grande, sans-serif", color: "#333", padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#000" }}>Garantías y Devoluciones</h1>
      <section>
        <h2 style={{ color: "#000" }}>Políticas Aplicadas a Consumidor Final</h2>
        <p>
          En Days Boutique, queremos garantizar que tengas una experiencia de compra satisfactoria. A continuación, te detallamos
          nuestras políticas de cambios, garantías y devoluciones.
        </p>

        <h3 style={{ color: "#000" }}>Cambios</h3>
        <ul>
          <li>Aplica dentro de los 30 días calendario desde la entrega del producto.</li>
          <li>El proceso puede tardar entre 1 y 20 días calendario.</li>
          <li>No aplica para productos en descuento, promociones como Black Friday, Cyber Week o Black Days.</li>
          <li>Los costos de devolución corren por cuenta del cliente.</li>
        </ul>

        <h3 style={{ color: "#000" }}>Garantías</h3>
        <p>
          Todos los productos cuentan con una garantía de 30 días calendario desde su recepción. Para artículos como maletas de
          viaje y bolsos, ofrecemos una garantía extendida de 60 días.
        </p>
        <p>Para iniciar un proceso de garantía, comunícate con nosotros a través de:</p>
        <ul>
          <li>Email: <a href="mailto:dayboutique@gmail.com">dayboutique@gmail.com</a></li>
          <li>WhatsApp: +57 3003188397</li>
        </ul>

        <h3 style={{ color: "#000" }}>Derecho de Retracto</h3>
        <p>
          Tienes derecho a retractarte de tu compra dentro de los 5 días hábiles siguientes a la entrega del producto, siempre que
          se haya realizado a través de nuestros canales virtuales. Las ventas presenciales no aplican.
        </p>
        <p>
          Para ejercer este derecho, comunícate con nosotros a través de nuestro correo o WhatsApp. Los costos de transporte
          correrán por tu cuenta.
        </p>

        <h3 style={{ color: "#000" }}>Faltantes</h3>
        <p>
          Si al recibir el pedido notas faltantes o irregularidades, notifícalo dentro de los 3 días calendario siguientes. Adjunta
          pruebas fotográficas y envíalas a nuestro correo: <a href="mailto:dayboutique@gmail.com">dayboutique@gmail.com</a>.
        </p>
      </section>

      <footer style={{ marginTop: "20px", textAlign: "center", borderTop: "1px solid #ddd", paddingTop: "10px", color: "#666" }}>
        <p>Days Boutique © 2024</p>
        <p>Correo: <a href="mailto:dayboutique@gmail.com">dayboutique@gmail.com</a></p>
        <p>Teléfono: +57 3003188397</p>
      </footer>
    </div>
  );
};

export default GuaranteesAndReturns;
