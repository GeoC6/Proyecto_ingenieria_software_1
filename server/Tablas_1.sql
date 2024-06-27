CREATE TABLE VEHICULO (
    PATENTE_COD_VEHICULO VARCHAR(20),
    MARCA VARCHAR(20),
    MODELO VARCHAR(20),
    COLOR VARCHAR(30),
    ANO INT,
    CONSTRAINT PK_VEHICULO PRIMARY KEY(PATENTE_COD_VEHICULO)
);


CREATE TABLE ROL_USUARIO (
    COD_ROL INT AUTO_INCREMENT,
    NOMBRE_ROL VARCHAR(30),
    CONSTRAINT PK_ROL_USUARIO PRIMARY KEY(COD_ROL)
);

CREATE TABLE USUARIOS (
    RUT_USUARIO VARCHAR(10),
    CONTRASEÑA VARCHAR(255),
    NOMBRE_USUARIO VARCHAR(30),
    APELLIDO1_USUARIO VARCHAR(30),
    APELLIDO2_USUARIO VARCHAR(30),
    COD_ROL INT,
    CONSTRAINT PK_USUARIO PRIMARY KEY(RUT_USUARIO),
    CONSTRAINT FK_USUARIO_PK_ROL_USUARIO FOREIGN KEY(COD_ROL) REFERENCES ROL_USUARIO(COD_ROL)
);

CREATE TABLE PRODUCTO(
    COD_PRODUCTO INT AUTO_INCREMENT,
    NOMBRE_PRODUCTO VARCHAR(30),
	IMAGEN_PRODUCTO VARCHAR(100),
    PRECIO_PRODUCTO INT,
    CANTIDAD_TOTAL INT,
    CANTIDAD_DISPONIBLE INT,
    IMAGEN VARCHAR(255),
    CONSTRAINT PK_PRODUCTO PRIMARY KEY(COD_PRODUCTO)
);


CREATE TABLE RESERVA(
	COD_RESERVA INT AUTO_INCREMENT,
	FECHA_CREACION DATE,
	ESTADO VARCHAR(20) DEFAULT 'Pendiente',
	TOTAL INT,
	CELULAR_CLIENTE VARCHAR(15),
	NOMBRE_CLIENTE VARCHAR(255),
	APELLIDO_CLIENTE VARCHAR(255),
	DIRECCION_CLIENTE VARCHAR(255),
	CIUDAD_CLIENTE VARCHAR(255),
    	CONSTRAINT PK_RESERVA PRIMARY KEY(COD_RESERVA)
);

CREATE TABLE DETALLE_RESERVA (
    COD_DETALLE_RESERVA INT AUTO_INCREMENT,
    COD_RESERVA INT,
    COD_PRODUCTO INT,
    CANTIDAD INT,
    SUBTOTAL INT,
    CONSTRAINT PK_DETALLE_RESERVA PRIMARY KEY(COD_DETALLE_RESERVA),
    CONSTRAINT FK_RESERVA_PK_RESERVA FOREIGN KEY (COD_RESERVA) REFERENCES RESERVA(COD_RESERVA),
    CONSTRAINT FK_RESERVA_PK_PRODUCTO FOREIGN KEY (COD_PRODUCTO) REFERENCES PRODUCTO(COD_PRODUCTO)
);

----------------------------------------------------------------
--------------------------NUEVAS TABLAS-------------------------
----------------------------------------------------------------

CREATE TABLE CLIENTE (
    COD_CLIENTE INT AUTO_INCREMENT,
    CORREO_CLIENTE VARCHAR(255),
    CONTRASENA VARCHAR(255),
    CELULAR_CLIENTE VARCHAR(15),
	NOMBRE_CLIENTE VARCHAR(255),
	APELLIDO_CLIENTE VARCHAR(255),
	DIRECCION_CLIENTE VARCHAR(255),
    CONSTRAINT PK_CLIENTE PRIMARY KEY(COD_CLIENTE)
);

CREATE TABLE CARRITO (
    COD_CARRITO INT AUTO_INCREMENT,
	COD_CLIENTE INT,
    COD_PRODUCTO INT,
    COSTO_TOTAL INT,
    CONSTRAINT PK_CARRITO PRIMARY KEY(COD_CARRITO),
    CONSTRAINT FK_COD_PRODUCTO FOREIGN KEY (COD_PRODUCTO) REFERENCES PRODUCTO(COD_PRODUCTO),
	CONSTRAINT FK_CARRITO_PK_CLIENTE FOREIGN KEY (COD_CLIENTE) REFERENCES CLIENTE(COD_CLIENTE)
);


CREATE TABLE PAGOS (
    COD_PAGO INT AUTO_INCREMENT,
	COD_CLIENTE INT,
    BUY_ORDER INT,
    TRANSACTION_DATE DATE,
    AMOUNT INT,
    STATUS VARCHAR(255),
    CONSTRAINT PK_PAGOS PRIMARY KEY (COD_PAGO),
    CONSTRAINT FK_PAGOS_PK_CLIENTE FOREIGN KEY (COD_CLIENTE) REFERENCES CLIENTE(COD_CLIENTE)
);

CREATE TABLE BOLETA(
    COD_BOLETA INT AUTO_INCREMENT,
	COD_CLIENTE INT,
    COD_PAGO INT,
    TRANSACTION_DATE DATE,
    AMOUNT INT,
    STATUS VARCHAR(255),
    CONSTRAINT PK_BOLETA PRIMARY KEY (COD_BOLETA),
    CONSTRAINT FK_TRANSACCION_PK_PAGOS FOREIGN KEY (COD_PAGO) REFERENCES PAGOS(COD_PAGO),
	CONSTRAINT FK_BOLETA_PK_CLIENTE FOREIGN KEY (COD_CLIENTE) REFERENCES CLIENTE(COD_CLIENTE)
);