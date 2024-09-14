# Principios SOLID
- [Single Responsibility Principle](#single-responsibility-principle)
- [Open/Closed Principle](#openclosed-principle)
- [Liskov Substitution Principle](#liskov-substitution-principle)
- [Interface Segregation Principle](#interface-segregation-principle)
- [Dependency Inversion Principle](#dependency-inversion-principle)


## Single Responsibility Principle:
```plaintext
Cada clase debe tener una única responsabilidad o razón para cambiar, lo que significa que una clase debe enfocarse en hacer una sola cosa.
```
- Se dividio los atributos que no pertenecen directamente al concepto de "Producto" en clases más específicas. Permitiendo que cada clase se enfoque en una unica responsabilidad.
- Se Crearon servicios independientes que manejan cada una de las reponsabilidades de los metodos proporcionados.
```
├── src/ 
│ ├── services/ 
│ │ ├── grupoProductoService.ts
│ │ ├── inventarioService.ts
│ │ ├── precioService.ts
│ │ ├── productoService.ts
│ │ ├── proveedorService.ts
```

## Open/Closed Principle:
```plaintext
Las entidades de software (clases, módulos, funciones) deben estar abiertas para su extensión, pero cerradas para modificación. Esto permite agregar nuevas funcionalidades sin cambiar el código existente.
```
**Mediante el uso del patrón Strategy, se cumple con el principio de Abierto/Cerrado (OCP)**, ya que el sistema está diseñado de tal manera que es cerrado para modificaciones pero abierto para extensiones. Esto significa que, si necesitas agregar nuevas funcionalidades o comportamientos, puedes hacerlo sin modificar el código existente.

Con el patrón Strategy, las clases como **ProductoStrategy**, **ProveedorStrategy**, y otras que implementan la interfaz **IEntidadStrategy**, están preparadas para cumplir con el principio OCP. Por ejemplo, si quieres agregar una nueva funcionalidad para manejar otra entidad (como **FabricanteStrategy**), puedes simplemente crear una nueva clase que implemente **IEntidadStrategy** y definir su lógica sin tener que modificar las estrategias o el contexto ya existentes.

El principio OCP establece que las entidades del sistema deben poder ser extendidas sin necesidad de modificar el código que ya está funcionando. En este caso, el contexto EntidadContext ya está diseñado para aceptar cualquier estrategia que implemente la interfaz, por lo que puedes añadir nuevas estrategias sin alterar su lógica interna. Esto facilita la escalabilidad y reduce el riesgo de introducir errores cuando se agregan nuevas funcionalidades al sistema.


- Se creo la interfaz **IEntidadStrategy.ts** con el metodo execute, para ejecutar las querys de cada entidad
```typescript
export interface IEntidadStrategy {
  execute(params: any[]): Promise<any>;
}
```
- Se creo la estrategia para la entidad producto **ProductoStrategy.ts**
```typescript
import { IEntidadStrategy } from '../IEntidadStrategy';
import pool from '../../database';

export class ProductoStrategy implements IEntidadStrategy {
  private action: 'crear' | 'obtener';

  constructor(action: 'crear' | 'obtener') {
    this.action = action;
  }

  async execute(params: any[]): Promise<any> {
    const getQuery = {
      crear: this.crearProductoQuery(),
      obtener: this.obtenerProductoQuery(),
    };

    const query = getQuery[this.action] || 'Acción no soportada';

    const result = await pool.query(query, params);
    return result;
  }

  private crearProductoQuery(): string {
    const query = `
      INSERT INTO productos (sku, nombre, nombre_extranjero, cod_grupo_producto, id_fabricante, id_proveedor, peso, id_unidad_medida, precio_lista, cod_barra, sku_alternante)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
    `;
    return query;
  }

  private obtenerProductoQuery(): string {
    const query = 'SELECT * FROM productos WHERE sku = $1';
    return query;
  }
}
```
- Se configura una clase o módulo para manejar el contexto y permitir la selección de estrategias.
```typescript
import { IEntidadStrategy } from '../strateties/IEntidadStrategy';

export class EntidadContext {
  private strategy!: IEntidadStrategy;

  setStrategy(strategy: IEntidadStrategy) {
    this.strategy = strategy;
  }

  async executeStrategy(params: any): Promise<any> {
    return await this.strategy.execute(params);
  }
}
```
- Se modifico el ProductoRepositoryPostgress para usar el contexto y la estrategia.
```typescript
// src/repositories/ProductoRepository.ts
import { IProductoRepository } from '../interfaces/IProductoRepository';
import { Producto, PrecioLista } from '../models/producto';
import pool from '../database';
import { EntidadContext } from '../contexts/EntidadContext';
import { ProductoStrategy } from '../strateties/postgress/ProductoStrategy';

export class ProductoRepositoryPostgres implements IProductoRepository {
  productoContext = new EntidadContext();

  async registrarProducto(producto: Producto): Promise<void> {
    this.productoContext.setStrategy(new ProductoStrategy('crear'));
    const productoArray = Object.values(producto);
    await this.productoContext.executeStrategy(productoArray);
  }

  async obtenerProductoPorSku(sku: string): Promise<Producto | null> {
    this.productoContext.setStrategy(new ProductoStrategy('obtener'));
    const result = await this.productoContext.executeStrategy([sku]);
    if (result?.rows.length > 0) {
      return result.rows[0];
    }
    return null;
  }
}
```

## Liskov Substitution Principle:
```plaintext
El Principio de Sustitución de Liskov (Liskov Substitution Principle, o LSP) establece que las subclases deben poder sustituir a sus clases base sin alterar el correcto funcionamiento del programa. Esto implica que cualquier clase que herede de otra debe cumplir con las mismas expectativas y no cambiar el comportamiento de la clase base, respetando su contrato.
```
**Mediante el uso del patrón Strategy, se cumple con el principio de Sustitución de Liskov (LSP)**, ya que las distintas estrategias implementan una interfaz común que actúa como contrato para sus métodos. En nuestro caso, todas las estrategias (por ejemplo, ProductoStrategy, ProveedorStrategy, y otras) implementan la interfaz IEntidadStrategy, que define un método execute(). Esto garantiza que cualquier clase que implemente la interfaz puede ser intercambiada en el contexto sin modificar el comportamiento del sistema.

El principio de sustitución de Liskov establece que una clase derivada debe poder sustituir a su clase base sin alterar la funcionalidad del programa. Aplicado al patrón Strategy, esto significa que, dado que todas las estrategias comparten la misma interfaz y se ajustan al mismo comportamiento contractual, podemos intercambiar una estrategia por otra sin necesidad de modificar el código que las utiliza. Por ejemplo, si el contexto está usando la estrategia ProductoStrategy para registrar productos, podemos cambiarla por ProveedorStrategy para manejar proveedores, y el flujo general de la aplicación no se verá afectado.


## Interface Segregation Principle:
```plaintext
Los clientes no deberían estar obligados a depender de interfaces que no utilizan. Es preferible crear interfaces más pequeñas y específicas que evitar interfaces genéricas con métodos no necesarios.
```

- Se hizo que cada clase solo dependa de las interfaces que realmente necesita, evitando **interfaces gordas**
```
├── src/ 
│ ├── interfaces/ 
│ │ ├── IGrupoProductoService.ts
│ │ ├── IInventarioService.ts
│ │ ├── IPrecioService.ts
│ │ ├── IProductoRepository.ts
│ │ ├── IProveedorService.ts
```

## Dependency Inversion Principle:
```plaintext
Los módulos de alto nivel no deben depender de módulos de bajo nivel; ambos deben depender de abstracciones. Las abstracciones no deben depender de los detalles, sino que los detalles deben depender de las abstracciones. Esto ayuda a desacoplar el código y facilita los cambios.
```
- Se creo repositorios de datos para interactuar con PostgreSQL
```
├── src/ 
│ ├── repositories/ 
│ │ ├── ProductoRepositoryPostgres.ts
```
- Se crearon Interfaces que van a ser implementadas por los repositorios de datos
```
├── src/ 
│ ├── interfaces/ 
│ │ ├── IProductoRepository.ts
```
- Creamos una instancia concreta de la interfaz del repositorio en el servicio y mediante el constructor inyectamos la dependencia, haciendo que el servicio dependa de una abstracción.
```typescript
// src/services/ProductoService.ts
import { IProductoRepository } from '../interfaces/IProductoRepository';
import { Producto } from '../models/producto';

export class ProductoService {
  private productoRepository: IProductoRepository;

  constructor(productoRepository: IProductoRepository) {
    this.productoRepository = productoRepository;
  }

  async registrarProducto(producto: Producto): Promise<void> {
    await this.productoRepository.registrarProducto(producto);
  }

  async obtenerProductoPorSku(sku: string): Promise<Producto | null> {
    return await this.productoRepository.obtenerProductoPorSku(sku);
  }
}
```
- En el controlador, instanciamos el repositorio que se va usar y se lo inyectamos en el servicio
```typescript
import { ProductoRepositoryPostgres } from '../repositories/ProductoRepositoryPostgres';

// Instanciamos el repositorio
const productoRepository = new ProductoRepositoryPostgres();

// Inyectar el repositorio en el servicio
const productoService = new ProductoService(productoRepository);

export const registrarProducto = async ( req: Request, res: Response): Promise<void> => {
  const producto: Producto = req.body;
  await productoService.registrarProducto(producto);
  res.status(201).send('Producto registrado');
};
```