from django import forms
from .models import Post
from django.conf import settings

MAX_POST_LENGTH = 300

class PostForm(forms.ModelForm):

    class Meta:
        model = Post
        fields = ['text']
        widgets = {
            'text': forms.Textarea(attrs={'class': 'form-control'})
        }

    def clean_text(self):
        content = self.cleaned_data.get('text')
        # print(len(content))
        if len(content) > MAX_POST_LENGTH:
            raise forms.ValidationError('This Tweet is Way too Long. (Max Length: 300)')
        return content