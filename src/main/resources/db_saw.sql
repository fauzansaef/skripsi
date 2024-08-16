-- db_saw_project.ref_bahasa_pemrograman definition

CREATE TABLE `ref_bahasa_pemrograman` (
                                          `id` int(11) NOT NULL AUTO_INCREMENT,
                                          `jenis` int(11) DEFAULT NULL COMMENT '1:FE, 2:BE',
                                          `keterangan` varchar(255) DEFAULT NULL,
                                          `nama` varchar(255) DEFAULT NULL,
                                          PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;


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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


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


-- db_saw_project.ref_stack definition

CREATE TABLE `ref_stack` (
                             `id` int(11) NOT NULL AUTO_INCREMENT,
                             `nama` varchar(100) DEFAULT NULL,
                             `keterangan` varchar(100) DEFAULT NULL,
                             `jenis` int(11) DEFAULT NULL COMMENT '1 : Bahasa Pemrograman\r\n2 : Database\r\n3 : Others',
                             PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;


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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;


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
                               `nd_request` varchar(100) DEFAULT NULL,
                               `stack` varchar(100) DEFAULT NULL,
                               `created_at` date DEFAULT NULL,
                               `id_approval` int(11) DEFAULT NULL,
                               PRIMARY KEY (`id`),
                               KEY `tb_aplikasi_FK` (`analis`),
                               KEY `tb_aplikasi_FK_1` (`id_approval`),
                               CONSTRAINT `tb_aplikasi_FK` FOREIGN KEY (`analis`) REFERENCES `tb_pegawai` (`id`),
                               CONSTRAINT `tb_aplikasi_FK_1` FOREIGN KEY (`id_approval`) REFERENCES `tb_pegawai` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=latin1;


-- db_saw_project.tb_kriteria_pegawai definition

CREATE TABLE `tb_kriteria_pegawai` (
                                       `id` int(11) NOT NULL AUTO_INCREMENT,
                                       `id_pegawai` int(11) NOT NULL,
                                       `kemampuan_coding` int(11) DEFAULT NULL COMMENT 'C1 -> kemampuan coding : ->src : https://www.codepolitan.com/blog/tingkatan-seorang-programmer-berdasarkan-skill-level/ \r\nnovice		: 1\r\nadvance 	: 2\r\ncompetent 	: 3\r\nproficient	: 4\r\nexpert 		: 5',
                                       `jumlah_pelatihan` varchar(255) DEFAULT NULL COMMENT 'C4 -> pelatihan\r\n0-1 pelatihan IT (programming) : 1\r\n 2  pelatihan IT (programming, database) : 2\r\n 3  pelatihan IT (programming, database, microservice): 3\r\n 4  pelatihan IT (programming, database, microservice, cicd): 4\r\n>=5 pelatihan IT (programming, database, microservice, cicd, dll) : 5',
                                       `jumlah_pengalaman` int(11) DEFAULT NULL COMMENT 'C3 -> pengalaman\r\n0-1 project : 1\r\n 2  project : 2\r\n 3  project : 3\r\n 4  project : 4\r\n>=5 project : 5',
                                       `jumlah_project_ongoing` int(11) DEFAULT NULL COMMENT 'C2 -> project yang sedang dikerjakan\r\n0 project : 1\r\n1 project : 2\r\n2 project : 3\r\n3 project : 4\r\n>=4 project : 5',
                                       `penguasaan_stack` varchar(255) DEFAULT NULL COMMENT 'C5 -> penguasaan stack :\r\n1 bahasa pemrograman (frontend || backend) : 1\r\n1 bahasa fulstack programming :  2\r\n1 bahasa fulstack programming, 1 database : 3\r\n>1 bahasa fulstack programming, >1 database, microservice : 4\r\n>2 bahasa fulstack programming, >2 database, microservice, devops: 5',
                                       PRIMARY KEY (`id`),
                                       UNIQUE KEY `tb_kriteria_pegawai_un` (`id_pegawai`),
                                       KEY `tb_kriteria_pegawai_FK_1` (`kemampuan_coding`),
                                       CONSTRAINT `tb_kriteria_pegawai_FK_1` FOREIGN KEY (`kemampuan_coding`) REFERENCES `ref_skill_programming` (`id`),
                                       CONSTRAINT `tb_kriteria_pegawai_FK_2` FOREIGN KEY (`id_pegawai`) REFERENCES `tb_pegawai` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;


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
                                              UNIQUE KEY `tb_kriteria_pegawai_matrix_un` (`id_pegawai`),
                                              KEY `FKkh9dqa5v03kpln3bjo2kuv5lr` (`id_pegawai`),
                                              CONSTRAINT `FKkh9dqa5v03kpln3bjo2kuv5lr` FOREIGN KEY (`id_pegawai`) REFERENCES `tb_pegawai` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;


-- db_saw_project.tb_tim definition

CREATE TABLE `tb_tim` (
                          `id` int(11) NOT NULL AUTO_INCREMENT,
                          `id_aplikasi` int(11) DEFAULT NULL,
                          `id_pegawai` int(11) DEFAULT NULL,
                          `role_project` varchar(10) DEFAULT NULL,
                          `surat_tugas` varchar(255) DEFAULT NULL,
                          PRIMARY KEY (`id`),
                          KEY `FKofrsvag0dtcx0jvrrdl774nau` (`id_pegawai`),
                          KEY `tb_tim_FK` (`id_aplikasi`),
                          CONSTRAINT `FKofrsvag0dtcx0jvrrdl774nau` FOREIGN KEY (`id_pegawai`) REFERENCES `tb_pegawai` (`id`),
                          CONSTRAINT `tb_tim_FK` FOREIGN KEY (`id_aplikasi`) REFERENCES `tb_aplikasi` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=latin1;


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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


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
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



INSERT INTO db_saw_project.tb_pegawai (active,alamat,email,gol_pangkat,nama,nip,no_hp,kantor,unit,jabatan) VALUES
                                                                                                               (1,'jl. test alamat','pegawai1@yopmail.com','IVa','Asep Hidayat','12345678','012345671','Direktorat Teknologi Informasi dan Komunikasi','PSPM','Kepala Seksi'),
                                                                                                               (1,'jl. test alamat','pegawai2@yopmail.com','IIIa','Yan Suseno','12345677','012345672','Direktorat Teknologi Informasi dan Komunikasi','PSPM','Sistem Analis'),
                                                                                                               (1,'jl. test alamat','pegawai3@yopmail.com','IIc','Faisal','12345676','012345673','Direktorat Teknologi Informasi dan Komunikasi','PSPM','Programmer'),
                                                                                                               (1,'jl. test alamat','pegawai4@yopmail.com','IIc','Ruby','12345675','012345674','Direktorat Teknologi Informasi dan Komunikasi','PSPM','Programmer'),
                                                                                                               (1,'jl. test alamat','pegawai5@yopmail.com','IIc','Novita','1234564','012345675','Direktorat Teknologi Informasi dan Komunikasi','PSPM','Programmer'),
                                                                                                               (1,'jl. test alamat','pegawai6@yopmail.com','IIc','Erwin','12345673','012345676','Direktorat Teknologi Informasi dan Komunikasi','PSPM','Programmer'),
                                                                                                               (1,'jl. test alamat','pegawai7@yopmail.com','IIc','Teguh','12345672','012345677','Direktorat Teknologi Informasi dan Komunikasi','PSPM','Programmer'),
                                                                                                               (1,'jl. test alamat','pegawai8@yopmail.com','IIc','Natali','12345671','012345678','Direktorat Teknologi Informasi dan Komunikasi','PSPM','Programmer'),
                                                                                                               (1,'jl. test alamat','pegawai9@yopmail.com','IIc','Febri','12345670','012345679','Direktorat Teknologi Informasi dan Komunikasi','PSPM','Programmer'),
                                                                                                               (1,'jl. test alamat','pegawai10@yopmail.com','IIc','Joko','12345679','012345670','Direktorat Teknologi Informasi dan Komunikasi','PSPM','Programmer');
INSERT INTO db_saw_project.tb_pegawai (active,alamat,email,gol_pangkat,nama,nip,no_hp,kantor,unit,jabatan) VALUES
    (1,'jl. test alamat','pegawai11@yopmail.com','IIc','Vina','12345666','01234561','Direktorat Teknologi Informasi dan Komunikasi','PSPM','Programmer');


INSERT INTO db_saw_project.ref_bahasa_pemrograman (jenis,keterangan,nama) VALUES
                                                                              (2,'Java (Springboot)','Java (Springboot)'),
                                                                              (1,'ReactJS','ReactJS'),
                                                                              (1,'AngularJS','AngularJS'),
                                                                              (2,'PHP(Laravel)','PHP(Laravel)');



INSERT INTO db_saw_project.ref_database (jenis,keterangan,nama) VALUES
                                                                    (1,'MySQL','MySQL'),
                                                                    (1,'Postgresql','Postgresql'),
                                                                    (2,'MongoDB','MongoDB'),
                                                                    (1,'Oracle','Oracle');

INSERT INTO db_saw_project.ref_stack (nama,keterangan,jenis) VALUES
                                                                 ('Spring Framework','Java Framework',1),
                                                                 ('Angular JS','JS Framework',1),
                                                                 ('NoSQL Database','NoSQL Database (Mongo DB,etc)',2),
                                                                 ('Oracle DB','Oracle DB',2),
                                                                 ('Postgresql DB','Postgresql DB',2),
                                                                 ('.Net core','.Net core',1),
                                                                 ('DevOps','DevOps',3),
                                                                 ('Microservice','Microservice',3),
                                                                 ('Docker','Docker',3);

INSERT INTO db_saw_project.ref_skill_programming (bobot,keterangan,nama) VALUES
                                                                             (1,'Novice','Novice'),
                                                                             (2,'Advance','Advance'),
                                                                             (3,'Competent','Competent'),
                                                                             (4,'Proficient','Proficient'),
                                                                             (5,'Expert','Expert');

INSERT INTO db_saw_project.tb_pembobotan (kriteria,bobot) VALUES
                                                              ('C1',0.35),
                                                              ('C2',0.25),
                                                              ('C3',0.15),
                                                              ('C4',0.05),
                                                              ('C5',0.2);

INSERT INTO db_saw_project.ref_role (keterangan,nama_role) VALUES
                                                               ('ROLE_ADMINISTRATOR','ROLE_ADMINISTRATOR'),
                                                               ('ROLE_KEPALA_SEKSI','ROLE_KEPALA_SEKSI'),
                                                               ('ROLE_ANALIS','ROLE_ANALIS'),
                                                               ('ROLE_PROGRAMMER','ROLE_PROGRAMMER');

INSERT INTO db_saw_project.ref_pelatihan (jenis,keterangan,nama) VALUES
                                                                     (1,'Pelatihan Framework Java Spring Boot','Pelatihan Framework Java Spring Boot'),
                                                                     (1,'Pelatihan Frontend dengan ReactJS','Pelatihan Frontend dengan ReactJS'),
                                                                     (3,'Pelatihan Implementasi Microservice pada Enterprise','Pelatihan Implementasi Microservice pada Enterprise'),
                                                                     (2,'Pelatihan Oracle Basic','Pelatihan Oracle Basic'),
                                                                     (4,'Implementasi CI/CD Training','Implementasi CI/CD Training'),
                                                                     (1,'Dotnet Core Training','Dotnet Core Training');

INSERT INTO db_saw_project.tb_user (active,id_pegawai,last_login,password,`role`,username) VALUES
                                                                                               (1,1,NULL,NULL,2,'kepalaseksi'),
                                                                                               (1,2,NULL,NULL,3,'analis'),
                                                                                               (1,3,NULL,NULL,4,'programmer1'),
                                                                                               (1,4,NULL,NULL,4,'programmer2'),
                                                                                               (1,5,NULL,NULL,4,'programmer3'),
                                                                                               (1,6,NULL,NULL,4,'programmer4'),
                                                                                               (1,7,NULL,NULL,4,'programmer5'),
                                                                                               (1,8,NULL,NULL,4,'programmer6'),
                                                                                               (1,9,NULL,NULL,4,'programmer7'),
                                                                                               (1,10,NULL,NULL,4,'programmer8');
INSERT INTO db_saw_project.tb_user (active,id_pegawai,last_login,password,`role`,username) VALUES
    (1,11,NULL,NULL,4,'programmer9');




INSERT INTO db_saw_project.tb_aplikasi (nama,bisnis_owner,versioning,tgl_nd,proses,jenis,analis,nd_request,stack,created_at,id_approval) VALUES
                                                                                                                                             ('Aplikasi 1','TPB','1.0','2024-08-01',4,3,2,'ND-123/PJ.123/2024','[1, 2, 4, 8]','2024-01-20',1),
                                                                                                                                             ('Aplikasi 2','TPB','1.0','2024-08-01',2,3,2,'ND-123/PJ.123/2024','[1, 2, 3]','2024-01-01',1),
                                                                                                                                             ('Aplikasi 3','TPB','1.0','2024-08-01',2,1,2,'','[1, 3]','2024-01-21',1),
                                                                                                                                             ('Project 1','TPB','1.0','2024-08-01',2,1,2,'ND-123/PJ.123/2024','[1, 2, 4]','2024-01-23',1),
                                                                                                                                             ('Aplikasi 1','TPB','1.0','2024-08-29',2,4,2,'ND-123/PJ.123/2024','[1]','2024-01-22',1),
                                                                                                                                             ('aplikasi 11','TPB','1.0','2024-08-04',1,3,2,'ND-124/PJ.123/2024','[2, 5]','2024-01-25',1),
                                                                                                                                             ('Sistem Informasi Keuangan','TPB','1.0','2024-07-01',1,1,2,'ND-123/PJ.123/2024','[1, 2, 3]','2024-08-15',NULL),
                                                                                                                                             ('Project 1','Direktorat Peraturan','1.0','2024-08-01',2,3,2,'ND-123/PJ.123/2024','[1, 2, 3, 4]','2024-08-16',1),
                                                                                                                                             ('Aplikasi Project A','Direktorat Peraturan','1.0','2024-08-01',1,3,2,'ND-123/PJ.123/2024','[1, 2, 3, 4]','2024-08-16',NULL),
                                                                                                                                             ('Project Baru 1','Direktorat Peraturan','1.0','2024-08-01',4,3,2,'ND-123/PJ.123/2024','[1, 2, 3, 4]','2024-08-16',1);




INSERT INTO db_saw_project.tb_kriteria_pegawai (id_pegawai,kemampuan_coding,jumlah_pelatihan,jumlah_pengalaman,jumlah_project_ongoing,penguasaan_stack) VALUES
                                                                                                                                                            (6,4,'[1]',5,12,'[1, 2, 5]'),
                                                                                                                                                            (5,4,'[1, 2, 4]',1,6,'[1, 2, 3, 7]'),
                                                                                                                                                            (7,2,'[1]',0,1,'[1]'),
                                                                                                                                                            (8,1,'[2]',0,0,'[1]'),
                                                                                                                                                            (9,1,'[1]',0,0,'[1]'),
                                                                                                                                                            (3,3,'[1, 2, 3]',1,2,'[1, 2, 3, 4]'),
                                                                                                                                                            (11,5,'[1]',0,0,'[1]'),
                                                                                                                                                            (10,3,'[1]',1,1,'[1, 2, 4]');


INSERT INTO db_saw_project.tb_kriteria_pegawai_matrix (id_pegawai,kemampuan_coding,pelatihan,pengalaman,project_ongoing,stack) VALUES
                                                                                                                                   (6,4.0,1.0,5.0,5.0,1.0),
                                                                                                                                   (5,4.0,2.0,1.0,5.0,1.0),
                                                                                                                                   (7,2.0,1.0,1.0,2.0,1.0),
                                                                                                                                   (8,1.0,1.0,1.0,1.0,1.0),
                                                                                                                                   (9,1.0,1.0,1.0,1.0,1.0),
                                                                                                                                   (10,3.0,1.0,1.0,2.0,1.0),
                                                                                                                                   (3,3.0,2.0,1.0,3.0,1.0),
                                                                                                                                   (11,5.0,1.0,1.0,1.0,1.0);


INSERT INTO db_saw_project.tb_tim (id_aplikasi,id_pegawai,role_project,surat_tugas) VALUES
                                                                                        (24,6,'Programmer',NULL),
                                                                                        (25,6,'Programmer',NULL),
                                                                                        (25,5,'Programmer',NULL),
                                                                                        (26,6,'Programmer',NULL),
                                                                                        (26,5,'Programmer',NULL),
                                                                                        (26,7,'Programmer',NULL),
                                                                                        (27,6,'Programmer',NULL),
                                                                                        (27,5,'Programmer',NULL),
                                                                                        (28,6,'Programmer',NULL),
                                                                                        (28,5,'Programmer',NULL);




INSERT INTO db_saw_project.tb_tim (id_aplikasi,id_pegawai,role_project,surat_tugas) VALUES
                                                                                        (31,10,'Programmer',NULL),
                                                                                        (31,6,'Programmer',NULL),
                                                                                        (33,6,'Programmer',NULL),
                                                                                        (33,3,'Programmer',NULL);