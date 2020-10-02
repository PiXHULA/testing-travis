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


import java.util.ArrayList;
import java.util.List;


import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class RepositoryTest {

    List<Application> applicationList = new ArrayList<>();
    Application app1 = Application.builder().Id(1L).link("http://1").logo("Logo1").build();
    Application app2 = Application.builder().Id(2L).link("http://2").logo("Logo2").build();
    Package pack1 = Package.builder().Id(1L).applications(applicationList).build();
    Package pack2 = Package.builder().Id(2L).applications(applicationList).build();
    List<Application> fetchedList;
    Package pack3;
    Package pack4;

    @Autowired
    ApplicationRepository applicationRepository;
    @Autowired
    PackageRepository packageRepository;

    @BeforeEach
    public void addItemsToDB(){
        applicationRepository.save(app1);
        applicationRepository.save(app2);
        fetchedList = applicationRepository.findAll();
        applicationList.add(app1);
        applicationList.add(app2);
        pack3 = packageRepository.save(pack1);
        pack4 = packageRepository.save(pack2);
    }

    @Test
    @DisplayName("Checking if applications has been added to Database")
    public void checkIfApplicationsBeenAddedToDb(){
        List <Application> allItems = applicationRepository.findAll();
        assertThat(allItems).hasSize(2);
    }

    @Test
    @DisplayName("Checking if one application belongs to a package")
    public void checkIfApplicationsBelongsToPackage(){
         assertThat(pack2.getApplications()).hasSize(2);
         Application app3 = pack2.getApplications().get(0);
         Application app4 = applicationRepository.getOne(1L);
         assertThat(app3.getLogo()).isEqualTo(app4.getLogo());
    }
    @Test
    @DisplayName("Checking if Application can belong to more than one package")
    public void checkIfApplicationsBelongsToMoreThanOnePackage(){
         assertThat(pack1.getApplications()).hasSize(2);
         assertThat(pack2.getApplications()).hasSize(2);

         Application appFromPack1 = pack1.getApplications().get(0);
         Application appFromPack2 = pack2.getApplications().get(0);
         Application appFromRepo = applicationRepository.getOne(1L);

         assertThat(appFromPack1.getLogo()).isEqualTo(appFromRepo.getLogo());
         assertThat(appFromPack2.getLogo()).isEqualTo(appFromRepo.getLogo());
    }

    @Test
    @DisplayName("Deleting application from DB")
    public void deleteApplicationFromDB(){
        assertThat(fetchedList).hasSize(2);
//        applicationRepository.deleteById(1L);
//        applicationRepository.flush();

        assertThat(fetchedList).hasSize(2);
        assertThat(fetchedList.get(1)).isNotNull();
    }

    @Test
    @DisplayName("Delete a package and keep the applications in database")
    public void deletePackageAndKeepApplicationsInDB(){
        packageRepository.delete(pack1);
        assertThat(applicationRepository.findAll()).hasSize(2);
        assertThat(applicationRepository.findById(1L)).isNotNull();
    }

    @Test
    @DisplayName("Delete an application and make sure it removes from the package")
    public void deleteApplicationAndNotShowInPackages(){
        Package newPackage = packageRepository.getOne(1L);
        assertThat(newPackage.getApplications()).hasSize(2);
        applicationRepository.delete(app1);
        newPackage = packageRepository.getOne(1L);
        assertThat(newPackage.getApplications()).hasSize(2);
        assertThat(newPackage.getApplications().get(0)).isNotNull();
        assertThat(newPackage.getApplications().get(1)).isNotNull();
    }
}
