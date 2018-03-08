from django.shortcuts import render

def index(request):
    print('dupa')
    return render(request, 'hello.html')

def arena(request):
    return render(request, 'index.html')
