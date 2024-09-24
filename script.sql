CREATE TABLE grupo_clientes (
  id SERIAL PRIMARY KEY,
  nombre_grupo_cliente VARCHAR(50) UNIQUE NOT NULL,
  porcentaje_descuento NUMERIC(5, 2) DEFAULT 0
);
CREATE TABLE cliente (
    id SERIAL PRIMARY KEY,
    nombre_cliente VARCHAR(100) NOT NULL,
    grupo_cliente_id INT NOT NULL,
    FOREIGN KEY (grupo_cliente_id) REFERENCES grupo_clientes(id)
);
CREATE TABLE fabricantes (
  id SERIAL PRIMARY KEY,
  sku_fabricante VARCHAR(50) UNIQUE NOT NULL,
  nombre_fabricante VARCHAR(100) NOT NULL
);
CREATE TABLE proveedores (
  id SERIAL PRIMARY KEY,
  sku_proveedor VARCHAR(50) UNIQUE NOT NULL,
  nombre_proveedor VARCHAR(100) NOT NULL
);
CREATE TABLE grupos_productos (
  cod_grupo_producto VARCHAR(50) PRIMARY KEY,
  nombre_grupo_producto VARCHAR(100) NOT NULL
);
CREATE TABLE unidades_medida (
  id SERIAL PRIMARY KEY,
  unidad VARCHAR(20) NOT NULL
);
CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  sku VARCHAR(50) UNIQUE,
  nombre VARCHAR(100) NOT NULL,
  nombre_extranjero VARCHAR(100),
  cod_grupo_producto VARCHAR(50),
  id_fabricante INT,
  id_proveedor INT,
  peso DECIMAL(10, 2),
  id_unidad_medida INT,
  precio_lista DECIMAL(12, 2) NOT NULL,
  cod_barra VARCHAR(50),
  sku_alternante VARCHAR(50),
  es_servicio BOOLEAN NOT NULL,
  FOREIGN KEY (cod_grupo_producto) REFERENCES grupos_productos(cod_grupo_producto),
  FOREIGN KEY (id_fabricante) REFERENCES fabricantes(id),
  FOREIGN KEY (id_proveedor) REFERENCES proveedores(id),
  FOREIGN KEY (id_unidad_medida) REFERENCES unidades_medida(id)
);
CREATE TABLE almacenes (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(255) NOT NULL,
  direccion VARCHAR(255),
  ciudad VARCHAR(100),
  estado VARCHAR(100)
);
CREATE TABLE inventario (
  producto_sku VARCHAR(50) PRIMARY KEY NOT NULL,
  almacen_id INT NOT NULL,
  minimo DECIMAL(10, 2) NOT NULL,
  maximo DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (producto_sku) REFERENCES productos(sku),
  FOREIGN KEY (almacen_id) REFERENCES almacenes(id)
);


CREATE TABLE venta (
    id_venta SERIAL PRIMARY KEY,
    id_cliente INT ,
    fecha TIMESTAMP DEFAULT NOW(),
    condicion_pago VARCHAR(50) NOT NULL,
    forma_entrega VARCHAR(50) NOT NULL,
    total_venta NUMERIC(10, 2) NOT NULL,
    total_descuento NUMERIC(10, 2) DEFAULT 0,
    total_impuesto NUMERIC(10, 2) DEFAULT 0,
    total_con_impuesto NUMERIC(10, 2) DEFAULT 0,
    FOREIGN KEY (id_cliente) REFERENCES cliente(id)
);

CREATE TABLE detalle_venta (
    id_detalle SERIAL PRIMARY KEY,
    id_venta INT NOT NULL,
    id_producto INT NOT NULL,
    id_almacen INT,
    cantidad INT NOT NULL,
    precio_unitario NUMERIC(10, 2) NOT NULL,
    descuento_item NUMERIC(5, 2) DEFAULT 0,
    --impuesto_item NUMERIC(5, 2) DEFAULT 0,
    subtotal NUMERIC(10, 2) NOT NULL,
    FOREIGN KEY (id_venta) REFERENCES venta(id_venta),
    FOREIGN KEY (id_producto) REFERENCES productos(id),
    FOREIGN KEY (id_almacen) REFERENCES almacenes(id)
);



INSERT INTO fabricantes(sku_fabricante, nombre_fabricante) VALUES('F-SY-JP', 'Industria SONY');
INSERT INTO proveedores(sku_proveedor, nombre_proveedor) VALUES('P-SN', 'SN');
INSERT INTO grupos_productos(cod_grupo_producto, nombre_grupo_producto) VALUES('GRP-001', 'Electrodomesticos');
INSERT INTO unidades_medida(unidad) VALUES('Unidad');
INSERT INTO almacenes(nombre) VALUES('Almacen principal');

INSERT INTO grupo_clientes(nombre_grupo_cliente, porcentaje_descuento) VALUES('General', 0);
INSERT INTO grupo_clientes(nombre_grupo_cliente, porcentaje_descuento) VALUES('VIP', 15);

INSERT INTO cliente(nombre_cliente, grupo_cliente_id) VALUES('Antonio Suarez', 1);
INSERT INTO cliente(nombre_cliente, grupo_cliente_id) VALUES('Maria Paz', 2);
INSERT INTO cliente(nombre_cliente, grupo_cliente_id) VALUES('Mario Perez', 2);


DROP TABLE inventario;
DROP TABLE productos;
DROP TABLE fabricantes;
DROP TABLE proveedores;
DROP TABLE grupos_productos;
DROP TABLE unidades_medida;
DROP TABLE almacenes;
DROP TABLE factura;
DROP TABLE detalle_factura;