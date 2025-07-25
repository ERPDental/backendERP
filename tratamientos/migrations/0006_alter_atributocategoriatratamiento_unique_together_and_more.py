# Generated by Django 5.0.14 on 2025-06-11 05:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tratamientos', '0005_merge_20250610_2240'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='atributocategoriatratamiento',
            unique_together=None,
        ),
        migrations.RemoveField(
            model_name='atributocategoriatratamiento',
            name='categoria',
        ),
        migrations.AlterModelOptions(
            name='categoriatratamiento',
            options={'ordering': ['nombre'], 'verbose_name': 'Categoría de Tratamiento', 'verbose_name_plural': 'Categorías de Tratamientos'},
        ),
        migrations.RemoveIndex(
            model_name='categoriatratamiento',
            name='tratamiento_activo_db81a4_idx',
        ),
        migrations.RemoveIndex(
            model_name='categoriatratamiento',
            name='tratamiento_parent__8f9e32_idx',
        ),
        migrations.RemoveIndex(
            model_name='categoriatratamiento',
            name='tratamiento_slug_3d6c06_idx',
        ),
        migrations.RemoveIndex(
            model_name='categoriatratamiento',
            name='tratamiento_nombre_39d23e_idx',
        ),
        migrations.RemoveField(
            model_name='categoriatratamiento',
            name='creado_por',
        ),
        migrations.RemoveField(
            model_name='categoriatratamiento',
            name='fecha_actualizacion',
        ),
        migrations.RemoveField(
            model_name='categoriatratamiento',
            name='fecha_creacion',
        ),
        migrations.RemoveField(
            model_name='categoriatratamiento',
            name='icono',
        ),
        migrations.RemoveField(
            model_name='categoriatratamiento',
            name='imagen',
        ),
        migrations.RemoveField(
            model_name='categoriatratamiento',
            name='meta_descripcion',
        ),
        migrations.RemoveField(
            model_name='categoriatratamiento',
            name='meta_titulo',
        ),
        migrations.RemoveField(
            model_name='categoriatratamiento',
            name='orden',
        ),
        migrations.RemoveField(
            model_name='categoriatratamiento',
            name='parent',
        ),
        migrations.RemoveField(
            model_name='categoriatratamiento',
            name='slug',
        ),
        migrations.AlterField(
            model_name='categoriatratamiento',
            name='descripcion',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='categoriatratamiento',
            name='nombre',
            field=models.CharField(max_length=100, unique=True),
        ),
        migrations.DeleteModel(
            name='AtributoCategoriaTratamiento',
        ),
    ]
