from django.db import models

# Create your models here.

class Map(models.Model):
    """ Map
    Map model is handling information about single defined map
    """
    rows = models.IntegerField()
    cols = models.IntegerField()
    text_definition = models.TextField()
