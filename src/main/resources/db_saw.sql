-- db_saw_project.ref_bahasa_pemrograman definition

CREATE TABLE `ref_bahasa_pemrograman` (
                                          `id` int(11) NOT NULL AUTO_INCREMENT,
                                          `jenis` int(11) DEFAULT NULL COMMENT '1:FE, 2:BE',
                                          `keterangan` varchar(255) DEFAULT NULL,
                                          `nama` varchar(255) DEFAULT NULL,
                                          PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;


-- db_saw_project.ref_database definition

CREATE TABLE `ref_database` (
                                `id` int(11) NOT NULL AUTO_INCREMENT,
                                `jenis` int(11) DEFAULT NULL COMMENT '1:sql,2:noSql',
                                `keterangan` varchar(255) DEFAULT NULL,
                                `nama` varchar(255) DEFAULT NULL,
                                PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;


-- db_saw_project.ref_pelatihan definition

CREATE TABLE `ref_pelatihan` (
                                 `id` int(11) NOT NULL AUTO_INCREMENT,
                                 `jenis` int(11) DEFAULT NULL COMMENT 'programming:1, database:2, microservice:3, cicd:4, dll:5',
                                 `keterangan` varchar(255) DEFAULT NULL,
                                 `nama` varchar(255) DEFAULT NULL,
                                 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;


-- db_saw_project.ref_penguasaan_stack definition

CREATE TABLE `ref_penguasaan_stack` (
                                        `id` int(11) NOT NULL AUTO_INCREMENT,
                                        `keterangan` varchar(100) DEFAULT NULL,
                                        `bobot` int(11) DEFAULT NULL,
                                        PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;


-- db_saw_project.ref_role definition

CREATE TABLE `ref_role` (
                            `id` int(11) NOT NULL AUTO_INCREMENT,
                            `keterangan` varchar(255) DEFAULT NULL,
                            `nama_role` varchar(255) DEFAULT NULL,
                            PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;


-- db_saw_project.ref_skill_programming definition

CREATE TABLE `ref_skill_programming` (
                                         `id` int(11) NOT NULL AUTO_INCREMENT,
                                         `bobot` int(11) DEFAULT NULL,
                                         `keterangan` varchar(255) DEFAULT NULL,
                                         `nama` varchar(255) DEFAULT NULL,
                                         PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;


-- db_saw_project.tb_pegawai definition

CREATE TABLE `tb_pegawai` (
                              `id` int(11) NOT NULL AUTO_INCREMENT,
                              `active` int(11) DEFAULT NULL,
                              `alamat` varchar(255) DEFAULT NULL,
                              `email` varchar(255) DEFAULT NULL,
                              `gol_pangkat` varchar(255) DEFAULT NULL,
                              `nama` varchar(255) DEFAULT NULL,
                              `nip` varchar(255) DEFAULT NULL,
                              `no_hp` varchar(255) DEFAULT NULL,
                              `kantor` varchar(100) DEFAULT NULL,
                              `unit` varchar(100) DEFAULT NULL,
                              `jabatan` varchar(100) DEFAULT NULL,
                              PRIMARY KEY (`id`),
                              UNIQUE KEY `UK_s8gvh7hj2s1edmmsxakot6qr8` (`email`),
                              UNIQUE KEY `UK_gkn75h4ywopmct42fkm8r4ksu` (`nip`),
                              UNIQUE KEY `UK_9fb1y9rmt07dq8rukjdstop4c` (`no_hp`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;


-- db_saw_project.tb_pembobotan definition

CREATE TABLE `tb_pembobotan` (
                                 `id` int(11) NOT NULL AUTO_INCREMENT,
                                 `kriteria` varchar(100) NOT NULL,
                                 `bobot` double NOT NULL,
                                 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;


-- db_saw_project.tb_aplikasi definition

CREATE TABLE `tb_aplikasi` (
                               `id` int(11) NOT NULL AUTO_INCREMENT,
                               `nama` varchar(255) DEFAULT NULL,
                               `bisnis_owner` varchar(100) DEFAULT NULL,
                               `versioning` varchar(100) DEFAULT NULL,
                               `tgl_nd` date DEFAULT NULL,
                               `proses` int(11) DEFAULT NULL COMMENT '0:draft,\r\n1:pembentukan tim,\r\n2:pengembangan, \r\n3:testing\r\n4:deploy',
                               `jenis` int(11) DEFAULT NULL COMMENT '1:services api,2:mobile,3:web 4: desktop',
                               `analis` int(11) DEFAULT NULL,
                               PRIMARY KEY (`id`),
                               KEY `tb_aplikasi_FK` (`analis`),
                               CONSTRAINT `tb_aplikasi_FK` FOREIGN KEY (`analis`) REFERENCES `tb_pegawai` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;


-- db_saw_project.tb_kriteria_pegawai definition

CREATE TABLE `tb_kriteria_pegawai` (
                                       `id` int(11) NOT NULL AUTO_INCREMENT,
                                       `id_pegawai` int(11) NOT NULL,
                                       `kemampuan_coding` int(11) DEFAULT NULL COMMENT 'C1 -> kemampuan coding : ->src : https://www.codepolitan.com/blog/tingkatan-seorang-programmer-berdasarkan-skill-level/ \r\nnovice		: 1\r\nadvance 	: 2\r\ncompetent 	: 3\r\nproficient	: 4\r\nexpert 		: 5',
                                       `jumlah_pelatihan` int(11) DEFAULT NULL COMMENT 'C4 -> pelatihan\r\n0-1 pelatihan IT (programming) : 1\r\n 2  pelatihan IT (programming, database) : 2\r\n 3  pelatihan IT (programming, database, microservice): 3\r\n 4  pelatihan IT (programming, database, microservice, cicd): 4\r\n>=5 pelatihan IT (programming, database, microservice, cicd, dll) : 5',
                                       `jumlah_pengalaman` int(11) DEFAULT NULL COMMENT 'C3 -> pengalaman\r\n0-1 project : 1\r\n 2  project : 2\r\n 3  project : 3\r\n 4  project : 4\r\n>=5 project : 5',
                                       `jumlah_project_ongoing` int(11) DEFAULT NULL COMMENT 'C2 -> project yang sedang dikerjakan\r\n0 project : 1\r\n1 project : 2\r\n2 project : 3\r\n3 project : 4\r\n>=4 project : 5',
                                       `penguasaan_stack` int(11) DEFAULT NULL COMMENT 'C5 -> penguasaan stack :\r\n1 bahasa pemrograman (frontend || backend) : 1\r\n1 bahasa fulstack programming :  2\r\n1 bahasa fulstack programming, 1 database : 3\r\n>1 bahasa fulstack programming, >1 database, microservice : 4\r\n>2 bahasa fulstack programming, >2 database, microservice, devops: 5',
                                       PRIMARY KEY (`id`),
                                       KEY `tb_kriteria_pegawai_FK_1` (`kemampuan_coding`),
                                       KEY `tb_kriteria_pegawai_FK_2` (`id_pegawai`),
                                       CONSTRAINT `tb_kriteria_pegawai_FK_1` FOREIGN KEY (`kemampuan_coding`) REFERENCES `ref_skill_programming` (`id`),
                                       CONSTRAINT `tb_kriteria_pegawai_FK_2` FOREIGN KEY (`id_pegawai`) REFERENCES `tb_pegawai` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


-- db_saw_project.tb_kriteria_pegawai_matrix definition

CREATE TABLE `tb_kriteria_pegawai_matrix` (
                                              `id` int(11) NOT NULL AUTO_INCREMENT,
                                              `id_pegawai` int(11) DEFAULT NULL,
                                              `kemampuan_coding` double DEFAULT NULL,
                                              `pelatihan` double DEFAULT NULL,
                                              `pengalaman` double DEFAULT NULL,
                                              `project_ongoing` double DEFAULT NULL,
                                              `stack` double DEFAULT NULL,
                                              PRIMARY KEY (`id`),
                                              KEY `FKkh9dqa5v03kpln3bjo2kuv5lr` (`id_pegawai`),
                                              CONSTRAINT `FKkh9dqa5v03kpln3bjo2kuv5lr` FOREIGN KEY (`id_pegawai`) REFERENCES `tb_pegawai` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;


-- db_saw_project.tb_tim definition

CREATE TABLE `tb_tim` (
                          `id` int(11) NOT NULL AUTO_INCREMENT,
                          `id_aplikasi` int(11) DEFAULT NULL,
                          `id_pegawai` int(11) DEFAULT NULL,
                          `role_project` varchar(10) DEFAULT NULL,
                          `surat_tugas` varchar(255) DEFAULT NULL,
                          PRIMARY KEY (`id`),
                          KEY `FKofrsvag0dtcx0jvrrdl774nau` (`id_pegawai`),
                          CONSTRAINT `FKofrsvag0dtcx0jvrrdl774nau` FOREIGN KEY (`id_pegawai`) REFERENCES `tb_pegawai` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;


-- db_saw_project.tb_user definition

CREATE TABLE `tb_user` (
                           `id` int(11) NOT NULL AUTO_INCREMENT,
                           `active` int(11) DEFAULT NULL,
                           `id_pegawai` int(11) DEFAULT NULL,
                           `last_login` datetime DEFAULT NULL,
                           `password` varchar(255) DEFAULT NULL,
                           `role` int(11) DEFAULT NULL,
                           `username` varchar(255) DEFAULT NULL,
                           PRIMARY KEY (`id`),
                           KEY `FKinp4cnsm6v40wj9xx0g8txl0h` (`id_pegawai`),
                           KEY `FKei9ed810kpur04nqefpej9d19` (`role`),
                           CONSTRAINT `FKei9ed810kpur04nqefpej9d19` FOREIGN KEY (`role`) REFERENCES `ref_role` (`id`),
                           CONSTRAINT `FKinp4cnsm6v40wj9xx0g8txl0h` FOREIGN KEY (`id_pegawai`) REFERENCES `tb_pegawai` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;


-- db_saw_project.trx_bahasa_pemrograman definition

CREATE TABLE `trx_bahasa_pemrograman` (
                                          `id` int(11) NOT NULL AUTO_INCREMENT,
                                          `id_aplikasi` int(11) NOT NULL,
                                          `id_bahasa_pemrograman` int(11) NOT NULL,
                                          PRIMARY KEY (`id`),
                                          KEY `trx_bahasa_pemrograman_FK` (`id_bahasa_pemrograman`),
                                          KEY `trx_bahasa_pemrograman_FK_1` (`id_aplikasi`),
                                          CONSTRAINT `trx_bahasa_pemrograman_FK` FOREIGN KEY (`id_bahasa_pemrograman`) REFERENCES `ref_bahasa_pemrograman` (`id`),
                                          CONSTRAINT `trx_bahasa_pemrograman_FK_1` FOREIGN KEY (`id_aplikasi`) REFERENCES `tb_aplikasi` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=128 DEFAULT CHARSET=latin1;


-- db_saw_project.trx_jenis_database definition

CREATE TABLE `trx_jenis_database` (
                                      `id` int(11) NOT NULL AUTO_INCREMENT,
                                      `id_aplikasi` int(11) NOT NULL,
                                      `id_database` int(11) NOT NULL,
                                      PRIMARY KEY (`id`),
                                      KEY `trx_jenis_database_FK` (`id_database`),
                                      KEY `trx_jenis_database_FK_1` (`id_aplikasi`),
                                      CONSTRAINT `trx_jenis_database_FK` FOREIGN KEY (`id_database`) REFERENCES `ref_database` (`id`),
                                      CONSTRAINT `trx_jenis_database_FK_1` FOREIGN KEY (`id_aplikasi`) REFERENCES `tb_aplikasi` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=114 DEFAULT CHARSET=latin1;