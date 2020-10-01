package com.example.demo;

import com.example.demo.domain.Application;
import com.example.demo.domain.Package;
import com.example.demo.repository.ApplicationRepository;
import com.example.demo.repository.PackageRepository;
import org.assertj.core.api.Assert;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;


import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
public class RepositoryTest {
    Application app1 = Application.builder().Id(1L).link("http://1").logo("Logo1").build();
    Application app2 = Application.builder().Id(2L).link("http://2").logo("Logo2").build();

    List<Application> list = new ArrayList<>();
    Package pack1 = Package.builder().applications(list).build();
    Package pack2;

    @Autowired
    ApplicationRepository applicationRepository;
    @Autowired
    PackageRepository packageRepository;
//
//    RepositoryTest (ApplicationRepository applicationRepository, PackageRepository packageRepository){
//        this.applicationRepository = applicationRepository;
//        this.packageRepository = packageRepository;
//    }
    @BeforeEach
    public void addItemsToDB(){
        applicationRepository.save(app1);
        applicationRepository.save(app2);
        list.add(app1);
        list.add(app2);
        pack2 = packageRepository.save(pack1);
    }

    @Test
    public void checkIfApplicationsBeenAddedToDb(){
        List <Application> allItems = applicationRepository.findAll();
        assertThat(allItems).hasSize(2);
    }

    @Test
    public void checkIfApplicationsBelongsToPackage(){
         assertThat(pack2.getApplications()).hasSize(2);
         Application app3 = pack2.getApplications().get(0);
         Application app4 = applicationRepository.getOne(1L);
         assertThat(app3.getLogo()).isEqualTo(app4.getLogo());
    }

    @Test
    public void deletePackageAndKeepApplicationsInDB(){
        packageRepository.delete(pack1);
        assertThat(applicationRepository.findAll()).hasSize(2);
        assertThat(applicationRepository.findById(1L)).isNotNull();
    }

    @Test
    @DisplayName("Delete an application and make sure it removes from the package")
    public void deleteApplicationAndNotShowInPackages(){
        //assertThat(pack1.getApplications()).hasSize(2);
        applicationRepository.delete(app1);
        assertThat(pack1.getApplications()).hasSize(1);
    }
}
