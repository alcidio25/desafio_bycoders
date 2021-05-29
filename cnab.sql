-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 29-Maio-2021 às 12:53
-- Versão do servidor: 10.4.14-MariaDB
-- versão do PHP: 7.4.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `dados`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `cnab`
--

CREATE TABLE `cnab` (
  `id_cnab` int(11) NOT NULL,
  `tipo` int(11) NOT NULL,
  `data` date NOT NULL,
  `valor` float NOT NULL,
  `cpf` varchar(150) NOT NULL,
  `cartao` varchar(30) NOT NULL,
  `hora` time NOT NULL,
  `dono` varchar(150) NOT NULL,
  `nome` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `cnab`
--
ALTER TABLE `cnab`
  ADD PRIMARY KEY (`id_cnab`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `cnab`
--
ALTER TABLE `cnab`
  MODIFY `id_cnab` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
