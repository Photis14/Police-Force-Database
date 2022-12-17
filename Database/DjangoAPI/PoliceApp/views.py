from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from PoliceApp.models import Units,Employees,Vehicles, Logs
from PoliceApp.serializers import UnitSerializer,EmployeeSerializer, VehiclesSerializer, LogsSerializer

from django.core.files.storage import default_storage

# Create your views here.


@csrf_exempt
def unitApi(request,id=0):
    if request.method=='GET':
        units = Units.objects.all()
        unit_serializer=UnitSerializer(units,many=True)
        return JsonResponse(unit_serializer.data,safe=False)
    elif request.method=='POST':
        unit_data=JSONParser().parse(request)
        unit_serializer=UnitSerializer(data=unit_data)
        if unit_serializer.is_valid():
            unit_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        unit_data=JSONParser().parse(request)
        unit=Units.objects.get(UnitId=unit_data['UnitId'])
        unit_serializer=UnitSerializer(unit,data=unit_data)
        if unit_serializer.is_valid():
            unit_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        unit=Units.objects.get(UnitId=id)
        unit.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def employeeApi(request,id=0):
    if request.method=='GET':
        employees = Employees.objects.all()
        employees_serializer=EmployeeSerializer(employees,many=True)
        return JsonResponse(employees_serializer.data,safe=False)
    elif request.method=='POST':
        employee_data=JSONParser().parse(request)
        employees_serializer=EmployeeSerializer(data=employee_data)
        if employees_serializer.is_valid():
            employees_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        employee_data=JSONParser().parse(request)
        employee=Employees.objects.get(EmployeeId=employee_data['EmployeeId'])
        employees_serializer=EmployeeSerializer(employee,data=employee_data)
        if employees_serializer.is_valid():
            employees_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        employee=Employees.objects.get(EmployeeId=id)
        employee.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def vehicleApi(request,id=0):
    if request.method=='GET':
        vehicles = Vehicles.objects.all()
        vehicles_serializer=VehiclesSerializer(vehicles,many=True)
        return JsonResponse(vehicles_serializer.data,safe=False)
    elif request.method=='POST':
        vehicle_data=JSONParser().parse(request)
        vehicles_serializer=VehiclesSerializer(data=vehicle_data)
        if vehicles_serializer.is_valid():
            vehicles_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        vehicle_data=JSONParser().parse(request)
        vehicle=Vehicles.objects.get(VehicleId=vehicle_data['VehicleId'])
        vehicles_serializer=VehiclesSerializer(vehicle,data=vehicle_data)
        if vehicles_serializer.is_valid():
            vehicles_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        vehicle=Vehicles.objects.get(VehicleId=id)
        vehicle.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def logApi(request,id=0):
    if request.method=='GET':
        logs = Logs.objects.all()
        logs_serializer=LogsSerializer(logs,many=True)
        return JsonResponse(logs_serializer.data,safe=False)
    elif request.method=='POST':
        log_data=JSONParser().parse(request)
        logs_serializer=LogsSerializer(data=log_data)
        if logs_serializer.is_valid():
            logs_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        log_data=JSONParser().parse(request)
        log=Logs.objects.get(LogId=log_data['LogId'])
        logs_serializer=LogsSerializer(log,data=log_data)
        if logs_serializer.is_valid():
            logs_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        log=Logs.objects.get(LogId=id)
        log.delete()
        return JsonResponse("Deleted Successfully",safe=False)

@csrf_exempt
def SaveFile(request):
    file=request.FILES['file']
    file_name=default_storage.save(file.name,file)
    return JsonResponse(file_name,safe=False)