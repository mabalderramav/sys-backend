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
  id SERIAL PRIMARY KEY,
  cod_grupo_producto VARCHAR(50) PRIMARY KEY,
  nombre_grupo_producto VARCHAR(100) NOT NULL
);
CREATE TABLE unidades_medida (
  id SERIAL PRIMARY KEY,
  unidad VARCHAR(20) NOT NULL
);
CREATE TABLE productos (
  id SERIAL PRIMARY KEY,
  sku VARCHAR(50) UNIQUE NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  nombre_extranjero VARCHAR(100),
  cod_grupo_producto VARCHAR(50),
  id_fabricante INT NOT NULL,
  id_proveedor INT NOT NULL,
  peso DECIMAL(10, 2) NOT NULL,
  id_unidad_medida INT NOT NULL,
  precio_lista DECIMAL(12, 2) NOT NULL,
  cod_barra VARCHAR(50),
  sku_alternante VARCHAR(50),
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


INSERT INTO fabricantes(sku_fabricante, nombre_fabricante) VALUES('F-SY-JP', 'Industria SONY');
INSERT INTO proveedores(sku_proveedor, nombre_proveedor) VALUES('P-SN', 'SN');
INSERT INTO grupos_productos(cod_grupo_producto, nombre_grupo_producto) VALUES('GRP-001', 'Electrodomesticos');
INSERT INTO unidades_medida(unidad) VALUES('Unidad');
INSERT INTO almacenes(nombre) VALUES('Almacen principal');

DROP TABLE productos;
DROP TABLE fabricantes;
DROP TABLE proveedores;
DROP TABLE grupos_productos;
DROP TABLE unidades_medida;