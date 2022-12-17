from rest_framework import serializers
from PoliceApp.models import Units,Employees,Vehicles, Logs

class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model=Units 
        fields=('UnitId',
            'UnitName',
            'UnitType',
            'UnitChief',
            'UnitCreationDate',
            'UnitStatus')

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Employees 
        fields=('EmployeeId',
                'EmployeeName',
                'Unit',
                'DateOfJoining',
                'EmployeeAddress',
                'EmployeeDOB',
                'EmployeSSN',
                'EmployeeRank',
                'EmployeeHeight',
                'EmployeeWeight',
                'EmployeeRace', 
                'PhotoFileName')

class VehiclesSerializer(serializers.ModelSerializer):
    class Meta:
        model=Vehicles 
        fields=('VehicleId',
                'PlateNumber',
                'Make',
                'Model',
                'Year',
                'DatePurchased',
                'Assignment')

class LogsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Logs 
        fields=('LogId',
                'MadeBy',
                'Code',
                'Type',
                'DateOccured',
                'Location',
                'Time',
                'Evidence',
                'Parties',
                'Action',
                'Notes')