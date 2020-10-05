package com.example.demo;

import com.example.demo.domain.Application;
import com.example.demo.domain.Package;
import com.example.demo.repository.ApplicationRepository;
import com.example.demo.repository.PackageRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.*;


import static org.assertj.core.api.Assertions.assertThat;


@DataJpaTest
public class RepositoryTest {

    Application app1 = Application.builder().Id(1L).link("http://1").logo("Logo1").build();
    Application app2 = Application.builder().Id(2L).link("http://2").logo("Logo2").build();
    Application app3 = Application.builder().Id(3L).link("http://2").logo("Logo2").build();
    Application app4 = Application.builder().Id(4L).link("http://2").logo("Logo2").build();
    Package pack1 = Package.builder().Id(1L).build();
    Package pack2 = Package.builder().Id(2L).build();

    Application app5;
    Application app6;

    Package pack3;


    @Autowired
    ApplicationRepository applicationRepository;
    @Autowired
    PackageRepository packageRepository;

    @BeforeEach
    public void addItemsToDB(){
       app5 = applicationRepository.save(app1);
       app6 = applicationRepository.save(app2);
       applicationRepository.save(app3);
       pack1.addApplication(app1);
       pack1.addApplication(app2);
       pack1.addApplication(app3);
       pack2.addApplication(app1);
       pack2.addApplication(app2);
       pack3 = packageRepository.save(pack1);
    }

    @Test
    @DisplayName("Checking if applications has been added to Database")
    public void checkIfApplicationsBeenAddedToDb(){
        List <Application> allItems = applicationRepository.findAll();
        assertThat(allItems).hasSize(3);
    }

    @Test
    @DisplayName("Checking if one application belongs to a package")
    public void checkIfApplicationsBelongsToPackage(){
         assertThat(pack1.getApplications().contains(app1)).isTrue();
         assertThat(pack1.getApplications().contains(app4)).isFalse();
    }

    @Test
    @DisplayName("Checking if Application can belong to more than one package")
    public void checkIfApplicationsBelongsToMoreThanOnePackage(){
         //PACK1
         assertThat(pack1.getApplications().contains(app1)).isTrue();
         assertThat(pack1.getApplications().contains(app2)).isTrue();
         assertThat(pack1.getApplications().contains(app3)).isTrue();
         //PACK2
         assertThat(pack2.getApplications().contains(app1)).isTrue();
         assertThat(pack2.getApplications().contains(app2)).isTrue();
         assertThat(pack2.getApplications().contains(app3)).isFalse();
    }

    @Test
    @DisplayName("Deleting application from DB")
    public void deleteApplicationFromDB(){
        //APP1 Exists
        assertThat(applicationRepository.findById(1L)).isNotNull();

        //REMOVING APP1
        applicationRepository.delete(app1);
        assertThat(applicationRepository.findById(1L)).isEmpty();
        assertThat(applicationRepository.findById(2L)).isNotNull();
        assertThat(applicationRepository.findById(3L)).isNotNull();
    }

    @Test
    @DisplayName("Delete a package and keep the applications in database")
    public void deletePackageAndKeepApplicationsInDB(){
        packageRepository.delete(pack1);
        packageRepository.delete(pack2);

        assertThat(applicationRepository.findById(1L)).isNotNull();
        assertThat(applicationRepository.findById(2L)).isNotNull();
        assertThat(applicationRepository.findById(3L)).isNotNull();
    }

    @Test
    @DisplayName("Delete an application and make sure it removes from the package")
    public void deleteApplicationAndNotShowInPackages(){
        applicationRepository.delete(app1);
        pack1.deleteApplication(app1);
        assertThat(pack1.getApplications().contains(app1)).isFalse();


    }
}
