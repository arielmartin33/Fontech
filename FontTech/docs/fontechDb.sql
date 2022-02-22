-- MySQL Script generated by MySQL Workbench
-- Mon Feb 21 09:02:35 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema FontechDb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema FontechDb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `FontechDb` DEFAULT CHARACTER SET utf8 ;
USE `FontechDb` ;

-- -----------------------------------------------------
-- Table `FontechDb`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FontechDb`.`categories` (
  `idCategory` INT NOT NULL AUTO_INCREMENT,
  `categoryDescription` VARCHAR(45) NULL,
  PRIMARY KEY (`idCategory`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FontechDb`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FontechDb`.`products` (
  `idProduct` INT NOT NULL AUTO_INCREMENT,
  `productName` VARCHAR(45) NULL,
  `productDescription` VARCHAR(45) NULL,
  `productPrice` DECIMAL(9) NULL,
  `productOffer` TINYINT(1) NULL,
  `productDiscount` INT NULL,
  `productVisited` TINYINT(1) NULL,
  `categoryId` INT NOT NULL,
  PRIMARY KEY (`idProduct`),
  INDEX `fk_product_category_idx` (`categoryId` ASC) VISIBLE,
  CONSTRAINT `fk_product_category`
    FOREIGN KEY (`categoryId`)
    REFERENCES `FontechDb`.`categories` (`idCategory`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FontechDb`.`images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FontechDb`.`images` (
  `idImage` INT NOT NULL AUTO_INCREMENT,
  `imageUrl` VARCHAR(45) NULL,
  `products_idProduct` INT NOT NULL,
  PRIMARY KEY (`idImage`),
  INDEX `fk_images_products1_idx` (`products_idProduct` ASC) VISIBLE,
  CONSTRAINT `fk_images_products1`
    FOREIGN KEY (`products_idProduct`)
    REFERENCES `FontechDb`.`products` (`idProduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FontechDb`.`profiles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FontechDb`.`profiles` (
  `idProfiles` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(45) NULL,
  PRIMARY KEY (`idProfiles`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FontechDb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FontechDb`.`users` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(45) NOT NULL,
  `lastName` VARCHAR(45) NULL,
  `email` VARCHAR(255) NULL,
  `password` VARCHAR(32) NOT NULL,
  `imageUrl` VARCHAR(45) NULL,
  `create_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `profiles_idProfiles` INT NOT NULL,
  PRIMARY KEY (`idUser`),
  INDEX `fk_users_profiles1_idx` (`profiles_idProfiles` ASC) VISIBLE,
  CONSTRAINT `fk_users_profiles1`
    FOREIGN KEY (`profiles_idProfiles`)
    REFERENCES `FontechDb`.`profiles` (`idProfiles`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


-- -----------------------------------------------------
-- Table `FontechDb`.`sales`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FontechDb`.`sales` (
  `idSales` INT NOT NULL AUTO_INCREMENT,
  `users_idUser` INT NOT NULL,
  `total` DECIMAL(9,2) NULL,
  `createdAt` TIMESTAMP NULL,
  PRIMARY KEY (`idSales`),
  INDEX `fk_sales_users1_idx` (`users_idUser` ASC) VISIBLE,
  CONSTRAINT `fk_sales_users1`
    FOREIGN KEY (`users_idUser`)
    REFERENCES `FontechDb`.`users` (`idUser`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `FontechDb`.`products_has_sales`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `FontechDb`.`products_has_sales` (
  `products_idProduct` INT NOT NULL,
  `sales_idSales` INT NOT NULL,
  `subtotal` DECIMAL(9,2) NULL,
  `discount` DECIMAL(9,2) NULL,
  PRIMARY KEY (`products_idProduct`, `sales_idSales`),
  INDEX `fk_products_has_sales_sales1_idx` (`sales_idSales` ASC) VISIBLE,
  INDEX `fk_products_has_sales_products1_idx` (`products_idProduct` ASC) VISIBLE,
  CONSTRAINT `fk_products_has_sales_products1`
    FOREIGN KEY (`products_idProduct`)
    REFERENCES `FontechDb`.`products` (`idProduct`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_has_sales_sales1`
    FOREIGN KEY (`sales_idSales`)
    REFERENCES `FontechDb`.`sales` (`idSales`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;