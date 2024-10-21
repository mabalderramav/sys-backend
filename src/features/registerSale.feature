Feature: Registro de Factura de Venta

  Scenario: Registrar una venta con datos válidos
    Given que el formulario de registro de venta está disponible
    When ingreso los siguientes datos de la cabecera de la factura:
      | CodigoCliente | NombreCliente   | CondicionPago |
      | 1             | Juan Pérez      | Efectivo       |
    And ingreso los siguientes datos del detalle de la factura:
      | CodigoProducto | NombreProducto | Cantidad | Precio | Total |
      | 1              | Producto 1     | 2        | 50.00  | 100.00 |
      | 2              | Producto 2     | 1        | 150.00 | 150.00 |
    And hago clic en "Registrar venta"
    Then la venta es registrada exitosamente
