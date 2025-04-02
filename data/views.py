from django.shortcuts import render

# Create your views here.
def dataes(request):
    return render(request, 'index.html')