from django.db import models

# Create your models here.
class Units(models.Model):
    UnitId = models.AutoField(primary_key=True)
    UnitName = models.CharField(max_length=500)
    UnitType = models.CharField(max_length=500)
    UnitChief = models.CharField(max_length=500)
    UnitCreationDate = models.DateField()
    UnitStatus = models.CharField(max_length=500)

class Employees(models.Model):
    EmployeeId = models.AutoField(primary_key=True)
    EmployeeName = models.CharField(max_length=500)
    Unit = models.CharField(max_length=500)
    DateOfJoining = models.DateField()
    EmployeeAddress = models.CharField(max_length=500)
    EmployeeDOB = models.DateField()
    EmployeSSN = models.CharField(max_length=500)
    EmployeeRank = models.CharField(max_length=500)
    EmployeeHeight = models.CharField(max_length=500)
    EmployeeWeight= models.CharField(max_length=500)
    EmployeeRace = models.CharField(max_length=500)
    PhotoFileName = models.CharField(max_length=500)


class Vehicles(models.Model):
    VehicleId = models.AutoField(primary_key=True)
    PlateNumber = models.CharField(max_length=500) 
    Make = models.CharField(max_length=500)
    Model = models.CharField(max_length=500)
    Year = models.CharField(max_length=500)
    DatePurchased = models.DateField()
    Assignment = models.CharField(max_length=500)

class Logs(models.Model):
    LogId = models.AutoField(primary_key=True)
    MadeBy = models.CharField(max_length=500)
    Code = models.CharField(max_length=500) 
    Type = models.CharField(max_length=500)
    DateOccured = models.DateField()
    Location = models.CharField(max_length=500)
    Time = models.CharField(max_length=500)
    Evidence = models.CharField(max_length=500)
    Parties = models.CharField(max_length=500)
    Action = models.CharField(max_length=500)
    Notes = models.CharField(max_length=500)