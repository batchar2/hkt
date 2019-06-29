from django import forms
from .models import Event

class ObjectBuilderForm(forms.Form):
    
    image = forms.ImageField(required=True)
